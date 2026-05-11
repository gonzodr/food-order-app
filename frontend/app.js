const API = 'http://localhost:3000/api';
let cart = [];
let token = localStorage.getItem('token');

// ── DOM elemek ──────────────────────────────────────────
const foodsGrid = document.getElementById('foods-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const orderBtn = document.getElementById('order-btn');
const authModal = document.getElementById('auth-modal');
const openAuthBtn = document.getElementById('open-auth-btn');
const closeModal = document.getElementById('close-modal');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const authTabs = document.querySelectorAll('.auth-tab');

// ── Auth állapot ────────────────────────────────────────
function updateAuthUI() {
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    userInfo.textContent = `👤 ${payload.email}`;
    logoutBtn.style.display = 'inline-block';
    openAuthBtn.style.display = 'none';
  } else {
    userInfo.textContent = '';
    logoutBtn.style.display = 'none';
    openAuthBtn.style.display = 'inline-block';
  }
}

logoutBtn.addEventListener('click', () => {
  token = null;
  localStorage.removeItem('token');
  updateAuthUI();
});

// ── Modal ───────────────────────────────────────────────
openAuthBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
closeModal.addEventListener('click', () => authModal.classList.add('hidden'));

authTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    authTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (tab.dataset.tab === 'login') {
      document.getElementById('login-form').classList.remove('hidden');
      document.getElementById('register-form').classList.add('hidden');
    } else {
      document.getElementById('login-form').classList.add('hidden');
      document.getElementById('register-form').classList.remove('hidden');
    }
  });
});

// ── Login ───────────────────────────────────────────────
loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const error = document.getElementById('login-error');
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) { error.textContent = data.error; return; }
    token = data.token;
    localStorage.setItem('token', token);
    authModal.classList.add('hidden');
    updateAuthUI();
  } catch {
    error.textContent = 'Szerverhiba';
  }
});

// ── Register ────────────────────────────────────────────
registerBtn.addEventListener('click', async () => {
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const error = document.getElementById('register-error');
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (!res.ok) { error.textContent = data.error; return; }
    error.style.color = 'green';
    error.textContent = 'Sikeres regisztráció! Jelentkezz be.';
  } catch {
    error.textContent = 'Szerverhiba';
  }
});

// ── Ételek betöltése ────────────────────────────────────
async function loadFoods() {
  try {
    const res = await fetch(`${API}/foods`);
    const foods = await res.json();
    foodsGrid.innerHTML = '';
    foods.forEach(food => {
      const card = document.createElement('div');
      card.className = 'food-card';
      card.innerHTML = `
        <h3>${food.name}</h3>
        <p>${food.description || ''}</p>
        <span class="price">${food.price} Ft</span>
        <button onclick="addToCart(${food.id}, '${food.name}', ${food.price})">
          + Kosárba
        </button>
      `;
      foodsGrid.appendChild(card);
    });
  } catch {
    foodsGrid.innerHTML = '<p>Nem sikerült betölteni az ételeket.</p>';
  }
}

// ── Kosár ───────────────────────────────────────────────
function addToCart(id, name, price) {
  const existing = cart.find(i => i.food_id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ food_id: id, name, price, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.food_id !== id);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>${item.price * item.quantity} Ft</span>
      <button onclick="removeFromCart(${item.food_id})">✕</button>
    `;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = total;
}

// ── Rendelés ────────────────────────────────────────────
orderBtn.addEventListener('click', async () => {
  if (!token) {
    alert('Rendeléshez be kell jelentkezni!');
    authModal.classList.remove('hidden');
    return;
  }
  if (cart.length === 0) {
    alert('A kosár üres!');
    return;
  }
  try {
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ items: cart })
    });
    const data = await res.json();
    if (!res.ok) { alert(data.error); return; }
    alert('✅ Rendelés sikeresen leadva!');
    cart = [];
    renderCart();
  } catch {
    alert('Szerverhiba');
  }
});

// ── Indítás ─────────────────────────────────────────────
updateAuthUI();
loadFoods();
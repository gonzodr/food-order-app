CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS foods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  food_id INTEGER REFERENCES foods(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

INSERT INTO foods (name, description, price, category) VALUES
  ('Margherita Pizza', 'Paradicsom, mozzarella, bazsalikom', 2500, 'pizza'),
  ('Pepperoni Pizza', 'Paradicsom, mozzarella, pepperoni', 2900, 'pizza'),
  ('Caesar Saláta', 'Rómaisaláta, csirke, parmezan', 1800, 'saláta'),
  ('Hamburger', 'Marhahús, saláta, paradicsom, sajt', 2200, 'burger'),
  ('Coca-Cola', '0.5l', 500, 'ital');
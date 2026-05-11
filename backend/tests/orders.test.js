const request = require('supertest');
const app = require('../src/app');

describe('Orders API', () => {
  let token;

  beforeAll(async () => {
    const user = {
      username: `order_teszt_${Date.now()}`,
      email: `order_${Date.now()}@teszt.com`,
      password: 'jelszo123'
    };
    await request(app).post('/api/auth/register').send(user);
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password });
    token = res.body.token;
  });

  test('POST /api/orders - token nélkül 401-et ad', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: [{ food_id: 1, quantity: 1, price: 2490 }] });
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/orders - sikeres rendelés leadása', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ food_id: 1, quantity: 2, price: 2490 }] });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.order).toHaveProperty('total');
  });

  test('POST /api/orders - üres kosár hibát ad', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [] });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/orders/my - saját rendelések lekérése', async () => {
    const res = await request(app)
      .get('/api/orders/my')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
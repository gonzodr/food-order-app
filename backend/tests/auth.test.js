const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  const testUser = {
    username: `tesztelo_${Date.now()}`,
    email: `teszt_${Date.now()}@teszt.com`,
    password: 'jelszo123'
  };

  test('POST /api/auth/register - sikeres regisztráció', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.user).toHaveProperty('email', testUser.email);
  });

  test('POST /api/auth/register - dupla regisztráció hibát ad', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/auth/login - sikeres bejelentkezés', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - hibás jelszó', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'rossz_jelszo' });
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/auth/login - hiányzó mezők', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email });
    expect(res.statusCode).toBe(400);
  });
});
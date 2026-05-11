const request = require('supertest');
const app = require('../src/app');

describe('Foods API', () => {
  test('GET /api/foods - visszaadja az ételek listáját', async () => {
    const res = await request(app).get('/api/foods');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/foods/:id - visszaad egy ételt', async () => {
    const res = await request(app).get('/api/foods/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('price');
  });

  test('GET /api/foods/:id - 404 ha nem létezik', async () => {
    const res = await request(app).get('/api/foods/99999');
    expect(res.statusCode).toBe(404);
  });
});
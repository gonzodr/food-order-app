const { client } = require('../src/middleware/cache');
const pool = require('../src/db/pool');

afterAll(async () => {
  await client.quit();
  await pool.end();
});
const pool = require('../db/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Minden mező kitöltése kötelező' });
  }
  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Ez az email már foglalt' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: 'Sikeres regisztráció', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Szerverhiba' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email és jelszó megadása kötelező' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Hibás email vagy jelszó' });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Hibás email vagy jelszó' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ message: 'Sikeres bejelentkezés', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Szerverhiba' });
  }
};

module.exports = { register, login };
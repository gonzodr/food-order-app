const pool = require('../db/pool');

const getAllFoods = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM foods ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Szerverhiba' });
  }
};

const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM foods WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Az étel nem található' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Szerverhiba' });
  }
};

module.exports = { getAllFoods, getFoodById };
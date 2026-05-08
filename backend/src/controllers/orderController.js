const pool = require('../db/pool');

const createOrder = async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'A kosár üres' });
  }

  try {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await pool.query(
      'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
      [userId, total]
    );

    const orderId = order.rows[0].id;

    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, food_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.food_id, item.quantity, item.price]
      );
    }

    res.status(201).json({ message: 'Rendelés leadva!', order: order.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Szerverhiba' });
  }
};

const getMyOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Szerverhiba' });
  }
};

module.exports = { createOrder, getMyOrders };
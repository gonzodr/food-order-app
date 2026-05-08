const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/pool');

const app = express();

app.use(cors());
app.use(express.json());

// Routes (később ide kerülnek)
const foodRoutes = require('./routes/foodRoutes');
app.use('/api/foods', foodRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Food Order API is running 🍕' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
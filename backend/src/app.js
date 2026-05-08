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
// app.use('/api/auth', authRoutes);
// app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Food Order API is running 🍕' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
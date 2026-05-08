const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, createOrder);
router.get('/my', authenticateToken, getMyOrders);

module.exports = router;
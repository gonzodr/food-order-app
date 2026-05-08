const express = require('express');
const router = express.Router();
const { getAllFoods, getFoodById } = require('../controllers/foodController');
const { cacheMiddleware } = require('../middleware/cache');

router.get('/', cacheMiddleware, getAllFoods);
router.get('/:id', cacheMiddleware, getFoodById);

module.exports = router;
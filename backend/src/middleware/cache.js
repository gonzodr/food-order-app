const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect()
  .then(() => console.log('»»» Redis connected'))
  .catch(err => console.error(' X Redis connection error:', err));

const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;
  try {
    const cached = await client.get(key);
    if (cached) {
      console.log('Cache hit:', key);
      return res.json(JSON.parse(cached));
    }
    res.sendResponse = res.json;
    res.json = async (data) => {
      await client.setEx(key, 60, JSON.stringify(data));
      res.sendResponse(data);
    };
    next();
  } catch (err) {
    console.error('Redis hiba:', err);
    next();
  }
};

module.exports = { client, cacheMiddleware };
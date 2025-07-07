const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendController');

router.post('/get', getRecommendations);  // POST /api/recommend/get

module.exports = router;

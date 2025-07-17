const express = require('express');
const router = express.Router();
const { getTopUsers } = require('../controllers/leaderboardController');

router.get('/', getTopUsers);  // GET /api/leaderboard

module.exports = router;

const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

router.get('/', async (req, res) => {
  try {
    const topUsers = await Leaderboard.find()
      .sort({ shards: -1, solvedCount: -1 })
      .limit(10);
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

module.exports = router;

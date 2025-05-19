const express = require('express');
const router = express.Router();
const shardController = require('../controllers/shardController');

// Get all shards
router.get('/', shardController.getAllShards);

// Add shards to a user
router.post('/add/:userId', shardController.addShardsToUser);

// Calculate shards earned for a solved question
router.post('/calculate/:userId', shardController.calculateShardsForQuestion);

module.exports = router;

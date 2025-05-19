const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

// Get all cards
router.get('/', cardController.getAllCards);

// Get user’s earned cards
router.get('/user/:userId', cardController.getUserCards);

// Check if a card can be formed from shards
router.get('/check/:userId/:cardId', cardController.checkIfCardCanBeFormed);

// Form a card if shards are enough
router.post('/form/:userId/:cardId', cardController.formCardFromShards);

module.exports = router;

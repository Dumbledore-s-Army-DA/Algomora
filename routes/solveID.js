const express = require('express');
const router = express.Router();
const { getQuestionsByDifficulty, getQuestionById } = require('../controllers/questionIdController');

// Route to get questions by difficulty
router.get('/difficulty/:difficulty', getQuestionsByDifficulty);

// Route to get question by ID
router.get('/:id', getQuestionById);

module.exports = router;

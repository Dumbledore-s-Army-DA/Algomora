const express = require('express');
const router = express.Router();
const {
  getQuestionsByDifficulty,
  getQuestionById
} = require('../controllers/QuestionController');

router.get('/difficulty/:difficulty', getQuestionsByDifficulty);
router.get('/:id', getQuestionById);

module.exports = router;   

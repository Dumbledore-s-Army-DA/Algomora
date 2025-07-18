const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const mongoose = require('mongoose');
const {
  getQuestionsByDifficulty,
  getQuestionById,
  getQuestionsByIds // ✅ Use correct function name
} = require('../controllers/QuestionController');

// GET questions by difficulty level
router.get('/difficulty/:difficulty', getQuestionsByDifficulty);

// POST questions by array of problem_ids (e.g., ['L0001', 'L0002'])
router.post('/byIds', async (req, res) => {
  const { problemIds } = req.body;

  if (!Array.isArray(problemIds)) {
    return res.status(400).json({ error: 'problemIds must be an array' });
  }

  try {
    // Ensure all IDs are strings
    const stringIds = problemIds.map(id => id.toString());

    const questions = await Question.find({ problem_id: { $in: problemIds } });
    res.json(questions);
  } catch (error) {
    console.error('❌ Error fetching questions by IDs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET a single question by its problem_id
router.get('/:id', getQuestionById); // ✅ GET method for single question

module.exports = router;

const mongoose = require('mongoose');
const Question = require('../models/Question');

// Fetch questions by difficulty
const getQuestionsByDifficulty = async (req, res) => {
  try {
    const difficulty = req.params.difficulty;
    const questions = await Question.find({ difficulty });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Fetch a single question by its MongoDB _id
const getQuestionById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid question ID format' });
  }

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ✅ Fetch multiple questions by their `problem_id` values (used for ML recommendations)
const getQuestionsByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'ids must be an array' });
    }

    const questions = await Question.find({ problem_id: { $in: ids } });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

module.exports = {
  getQuestionsByDifficulty,
  getQuestionById,
  getQuestionsByIds // ✅ renamed for consistency with route
};

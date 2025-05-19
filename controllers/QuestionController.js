const mongoose = require('mongoose');
const Question = require('../models/Question');

const getQuestionsByDifficulty = async (req, res) => {
  try {
    const difficulty = req.params.difficulty;
    const questions = await Question.find({ difficulty });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

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

module.exports = {
  getQuestionsByDifficulty,
  getQuestionById
};

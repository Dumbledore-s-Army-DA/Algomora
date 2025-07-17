const questionE = require('../models/questionE');
const lbw = require('../models/lbw');
const User = require('../models/User');

exports.getDebuggerQuestions = async (req, res) => {
  try {
    const questions = await questionE.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitDebuggerResult = async (req, res) => {
  try {
    const { eventId, userId, timeTaken } = req.body;
    const user = await User.findById(userId);
    const username = user?.username || 'Anonymous';

    const entry = new lbw({ username, eventId, timeTaken, userId });
    await entry.save();

    res.status(200).json({ message: 'Submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDebuggerLeaderboard = async (req, res) => {
  try {
    const { eventId } = req.params;
    const leaderboard = await lbw.find({ eventId }).sort({ timeTaken: 1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

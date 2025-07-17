const User = require('../models/User');

exports.getTopUsers = async (req, res) => {
  try {
    const topUsers = await User.find({})
      .select('username name house shards photo')  // only necessary fields
      .sort({ shards: -1 })
      .limit(50);

    res.status(200).json(topUsers);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Server error fetching leaderboard' });
  }
};

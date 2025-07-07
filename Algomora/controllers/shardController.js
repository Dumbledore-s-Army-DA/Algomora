const User = require('../models/User');

// Get user's shard balance
exports.getShardBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('shards');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ shards: user.shards });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add shards to a user (for rewards or admin panel)
exports.addShards = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.shards += amount;
    await user.save();

    res.status(200).json({ message: `Added ${amount} shards`, shards: user.shards });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deduct shards from a user (optional: for punishment or refund)
exports.deductShards = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.shards < amount) {
      return res.status(400).json({ error: 'Not enough shards' });
    }

    user.shards -= amount;
    await user.save();

    res.status(200).json({ message: `Deducted ${amount} shards`, shards: user.shards });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

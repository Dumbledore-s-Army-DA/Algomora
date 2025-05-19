const Card = require('../models/Card');
const User = require('../models/User');

// Get all cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Claim a card using shards
exports.claimCard = async (req, res) => {
  try {
    const { userId, cardId } = req.body;

    const user = await User.findById(userId);
    const card = await Card.findById(cardId);

    if (!user || !card) {
      return res.status(404).json({ error: 'User or Card not found' });
    }

    if (user.shards < card.shardsRequired) {
      return res.status(400).json({ error: 'Not enough shards' });
    }

    if (user.cards.includes(cardId)) {
      return res.status(400).json({ error: 'Card already owned' });
    }

    user.shards -= card.shardsRequired;
    user.cards.push(cardId);
    await user.save();

    res.status(200).json({ message: 'Card claimed successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

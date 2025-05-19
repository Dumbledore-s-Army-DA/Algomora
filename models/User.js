const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  photo: String, // URL or base64
  shards: { type: Number, default: 0 },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  questionsSolved: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    date: Date
  }]
});

module.exports = mongoose.model('User', userSchema);

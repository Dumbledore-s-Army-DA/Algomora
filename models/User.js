const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  photo: String,
  shards: { type: Number, default: 0 },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  questionsSolved: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    date: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

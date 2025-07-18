const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  timeTaken: { type: Number, required: true },
  eventId: { type: String, required: true }
}, { collection: 'lbw' });

module.exports = mongoose.model('lbw', leaderboardSchema);

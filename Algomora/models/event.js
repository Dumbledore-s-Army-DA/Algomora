const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  shardReward: Number
});

module.exports = mongoose.model('Event', eventSchema);

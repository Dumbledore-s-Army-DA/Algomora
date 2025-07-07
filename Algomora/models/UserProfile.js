const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  topics: {
    type: Map,
    of: Number, // e.g., { arrays: 4, dp: 2 }
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);

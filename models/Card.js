const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: String,
  image: String, // Card artwork
  shardsRequired: Number
});

module.exports = mongoose.model('Card', cardSchema);

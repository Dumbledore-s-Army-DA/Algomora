const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  problem_id: { type: String, unique: true },
  questionText: String,
  buggyCode: String,
  expectedOutput: String,
});

module.exports = mongoose.model('questionE', questionSchema);

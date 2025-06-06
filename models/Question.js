const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  description: String,
  shardsReward: Number,
  testCases: [
    {
      input: String,
      expectedOutput: String
    }
  ]
}, { collection: 'questions' }); // 👈 Force the collection name here

module.exports = mongoose.model('Question', questionSchema);

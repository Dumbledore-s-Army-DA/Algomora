const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  problem_id: {
    type: String,
    unique: true,  // important to avoid duplicates
    required: true,
  },
  title: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  description: String,
  shardsReward: Number,
 testCases: [
  {
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    expectedOutput: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
],
}, { collection: 'questions' }); // 👈 Force the collection name here

module.exports = mongoose.model('Question', questionSchema);

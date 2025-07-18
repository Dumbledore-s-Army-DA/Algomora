const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: String,
  username: String,
  questionId: String,
  timeTaken: Number,
  solvedAt: Date,
  eventId: String
});

module.exports = mongoose.model('DebuggerSubmission', submissionSchema);

const mongoose = require('mongoose');

const debuggerQuestionSchema = new mongoose.Schema({
  title: String,
  buggyCode: String,
  expectedOutput: String
});

module.exports = mongoose.model('DebuggerQuestion', debuggerQuestionSchema);

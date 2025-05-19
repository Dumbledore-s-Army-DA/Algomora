const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../models/Question');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const questions = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    shardsReward: 50,
    testCases: [
      { input: "3, 9", expectedOutput: "12" },

    ]
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    shardsReward: 60,
    testCases: [
      { input: `"()"`, expectedOutput: `"true"` },
      { input: `"()[]{}"`, expectedOutput: `"true"` },
      { input: `"(]"`, expectedOutput: `"false"` }
    ]
  },
  {
    title: "Valid Parentheses",
    difficulty: "Medium",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    shardsReward: 60,
    testCases: [
      { input: `"()"`, expectedOutput: `"true"` },
      { input: `"()[]{}"`, expectedOutput: `"true"` },
      { input: `"(]"`, expectedOutput: `"false"` }
    ]
  },
  {
    title: "Valid Parentheses",
    difficulty: "Hard",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    shardsReward: 60,
    testCases: [
      { input: `"()"`, expectedOutput: `"true"` },
      { input: `"()[]{}"`, expectedOutput: `"true"` },
      { input: `"(]"`, expectedOutput: `"false"` }
    ]
  }
];

async function insertQuestions() {
  try {
    await Question.insertMany(questions);
    console.log("Questions with test cases inserted ✅");
  } catch (error) {
    console.error("Insert error:", error);
  } finally {
    mongoose.disconnect();
  }
}

insertQuestions();

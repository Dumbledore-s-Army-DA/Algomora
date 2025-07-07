const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  arrays: Number,
  strings: Number,
  linked_lists: Number,
  stacks_queues: Number,
  trees: Number,
  graphs: Number,
  dp: Number,
  recursion: Number,
  sorting_searching: Number,
  math: Number,
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", UserProfileSchema);

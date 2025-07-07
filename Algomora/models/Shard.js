const mongoose = require('mongoose');

const shardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Shard', shardSchema);

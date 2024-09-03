// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
  operation: String,
  filePath: String,
  timestamp: { type: Date, default: Date.now },
  rowCount: Number
});

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = Stats;

// models/botSettings.js
const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
  botName: String,
  botDesc: String,
  botStatus: String,
});

const Bot = mongoose.model('Bot', botSchema);

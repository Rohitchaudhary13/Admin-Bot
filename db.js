//db.js
// const MongoClient = require('mongodb').MongoClient;
// const uri = 'mongodb+srv://styyx:astconsulting@cluster0.ktj7oo6.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;

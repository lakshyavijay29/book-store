const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

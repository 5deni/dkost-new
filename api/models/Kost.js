const mongoose = require('mongoose');

const KostSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  facilities: [String],
  price: Number,
  isAvailable: Boolean,
  images: [String],
});

module.exports = mongoose.model('Kost', KostSchema);
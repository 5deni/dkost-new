const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Nomor kamar harus diisi'],
    trim: true
  },
  kost: {
    type: mongoose.Schema.ObjectId,
    ref: 'Kost',
    required: [true, 'Kamar harus terkait dengan kost']
  },
  type: {
    type: String,
    enum: ['Standard', 'Deluxe', 'Premium'],
    default: 'Standard'
  },
  price: {
    type: Number,
    required: [true, 'Harga kamar harus diisi']
  },
  size: {
    type: String,
    required: [true, 'Ukuran kamar harus diisi']
  },
  facilities: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: [true, 'Deskripsi kamar harus diisi']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  images: [
    {
      url: String,
      publicId: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', RoomSchema);
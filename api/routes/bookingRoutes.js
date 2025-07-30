const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { storage } = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

const {
  createBooking,
  getUserBookings,
  getBooking,
  cancelBooking,
  uploadPaymentProof
} = require('../controllers/bookingController');

// All routes require authentication
router.use(verifyToken);

router.route('/')
  .get(getUserBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBooking);

router.route('/:id/cancel')
  .put(cancelBooking);

router.route('/:id/payment-proof')
  .post(upload.single('proof'), uploadPaymentProof);

module.exports = router;

const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const Room = require('../models/Room');
const Kost = require('../models/Kost');
const { cloudinary } = require('../config/cloudinary');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res, next) => {
  try {
    const {
      kostId,
      roomId,
      startDate,
      duration,
      totalPrice,
      specialRequests
    } = req.body;

    // Verify room exists and is available
    const room = await Room.findById(roomId);
    if (!room) {
      return next(new ErrorResponse('Kamar tidak ditemukan', 404));
    }

    if (!room.isAvailable) {
      return next(new ErrorResponse('Kamar tidak tersedia', 400));
    }

    // Calculate end date
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + duration);

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      kost: kostId,
      room: roomId,
      startDate: start,
      endDate: end,
      duration,
      totalPrice,
      specialRequests,
      status: 'pending'
    });

    // Populate booking data
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phoneNumber')
      .populate('kost', 'name address')
      .populate('room', 'roomNumber type price');

    res.status(201).json({
      success: true,
      message: 'Booking berhasil dibuat',
      data: populatedBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    next(new ErrorResponse('Gagal membuat booking', 500));
  }
});

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('kost', 'name address')
    .populate('room', 'roomNumber type price')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email phoneNumber')
    .populate('kost', 'name address')
    .populate('room', 'roomNumber type price facilities');

  if (!booking) {
    return next(new ErrorResponse('Booking tidak ditemukan', 404));
  }

  // Make sure user owns this booking or is admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Tidak memiliki akses ke booking ini', 403));
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = asyncHandler(async (req, res, next) => {
  const { cancelReason } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse('Booking tidak ditemukan', 404));
  }

  // Make sure user owns this booking
  if (booking.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Tidak memiliki akses ke booking ini', 403));
  }

  // Can only cancel pending bookings
  if (booking.status !== 'pending') {
    return next(new ErrorResponse('Booking tidak dapat dibatalkan', 400));
  }

  booking.status = 'cancelled';
  booking.cancelReason = cancelReason;
  await booking.save();

  res.status(200).json({
    success: true,
    message: 'Booking berhasil dibatalkan',
    data: booking
  });
});

// @desc    Upload payment proof
// @route   POST /api/bookings/:id/payment-proof
// @access  Private
exports.uploadPaymentProof = asyncHandler(async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ErrorResponse('Booking tidak ditemukan', 404));
    }

    // Make sure user owns this booking
    if (booking.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Tidak memiliki akses ke booking ini', 403));
    }

    if (!req.files || !req.files.proof) {
      return next(new ErrorResponse('Silakan upload bukti pembayaran', 400));
    }

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.files.proof.path, {
      folder: 'dkost-payments',
      width: 800,
      height: 600,
      crop: 'limit'
    });

    // Create payment record
    const payment = await Payment.create({
      user: req.user.id,
      kost: booking.kost,
      booking: booking._id,
      amount: booking.totalPrice,
      paymentDate: new Date(),
      paymentProof: result.secure_url,
      paymentMethod: 'transfer',
      type: 'new_booking',
      status: 'waiting_confirmation'
    });

    // Update booking payment status
    booking.paymentStatus = 'partially_paid';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Bukti pembayaran berhasil diupload',
      data: payment
    });
  } catch (error) {
    console.error('Error uploading payment proof:', error);
    next(new ErrorResponse('Gagal upload bukti pembayaran', 500));
  }
});

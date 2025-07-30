const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber, address } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('Email sudah terdaftar', 400));
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
    role: 'user'
  });

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key-here',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(201).json({
    success: true,
    message: 'Registrasi berhasil',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Email dan password harus diisi', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Email atau password salah', 401));
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorResponse('Email atau password salah', 401));
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key-here',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(200).json({
    success: true,
    message: 'Login berhasil',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse('User dengan email tersebut tidak ditemukan', 404));
  }

  // Generate reset token (simplified - in production use crypto)
  const resetToken = Math.random().toString(36).substring(2, 15);
  
  // In production, save resetToken to user and send email
  // For now, just return success message
  
  res.status(200).json({
    success: true,
    message: 'Link reset password telah dikirim ke email Anda',
    // In development, return token for testing
    resetToken: resetToken
  });
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword } = req.body;
  const { resettoken } = req.params;

  if (!newPassword) {
    return next(new ErrorResponse('Password baru harus diisi', 400));
  }

  // In production, validate resettoken
  // For now, find user by email (simplified)
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse('Token reset tidak valid', 400));
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password berhasil direset'
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  
  res.status(200).json({
    success: true,
    data: user
  });
});

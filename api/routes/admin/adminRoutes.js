const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../../middleware/auth');
const {
  getDashboardSummary,
  getPaymentStatistics,
  confirmBooking,
  verifyPayment
} = require('../../controllers/admin/dashboardController');
const {
  getProfile,
  updateProfile,
  changePassword
} = require('../../controllers/admin/profileController');
const galleryRoutes = require('./galleryRoutes');
const { storage } = require('../../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

// Protected routes (require authentication and admin role)
router.use(verifyToken);
router.use(isAdmin);

// Dashboard routes
router.get('/dashboard/summary', getDashboardSummary);
router.get('/statistics', getPaymentStatistics);

// Booking management
router.put('/bookings/:id/confirm', confirmBooking);

// Payment management
router.put('/payments/:id/verify', verifyPayment);

// Profile management
router.get('/profile', getProfile);
router.put('/profile', upload.single('profilePicture'), updateProfile);
router.put('/profile/password', changePassword);

// Gallery management
router.use('/gallery', galleryRoutes);

module.exports = router;
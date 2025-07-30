const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe
} = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);

// Protected routes
router.get('/me', verifyToken, getMe);

module.exports = router;
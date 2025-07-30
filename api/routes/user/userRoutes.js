const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const userController = require('../../controllers/user/userController');
const paymentController = require('../../controllers/user/paymentController');


router.use(verifyToken);
router.get('/profile', verifyToken, userController.getProfile);
router.put('/profile', verifyToken, userController.updateProfile);
router.put('/profile/password', verifyToken, userController.changePassword);
router.put('/profile/picture', userController.updateProfilePicture);
router.get('/dashboard', verifyToken, userController.getDashboardSummary);
router.get('/payments/history', paymentController.getUserPaymentHistory);
router.get('/payments/pending', paymentController.getPendingPayments);
router.get('/payments/statistics', paymentController.getUserPaymentStatistics);
router.get('/payments/:paymentId', paymentController.getPaymentDetails);

module.exports = router;
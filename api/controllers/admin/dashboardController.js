const Booking = require('../../models/Booking');
const Kost = require('../../models/Kost');
const User = require('../../models/User');
const Payment = require('../../models/Payment');

// @desc    Get dashboard summary
// @route   GET /api/admin/dashboard/summary
// @access  Private/Admin
exports.getDashboardSummary = async (req, res) => {
  try {
    // Get counts for summary cards
    const totalKost = await Kost.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingPayments = await Payment.countDocuments({ status: 'pending' });

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .populate('kost', 'name');

    // Get monthly revenue
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          status: 'completed',
          paidAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const revenue = monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0;

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalKost,
          totalUsers,
          totalBookings,
          pendingPayments,
          monthlyRevenue: revenue
        },
        recentBookings
      }
    });
  } catch (error) {
    console.error('Error getting dashboard summary:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get payment statistics
// @route   GET /api/admin/statistics
// @access  Private/Admin
exports.getPaymentStatistics = async (req, res) => {
  try {
    // Get monthly revenue
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    // Calculate monthly revenue
    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          status: 'completed',
          paidAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const revenue = monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0;

    // Get pending payments count
    const pendingPayments = await Payment.countDocuments({ status: 'pending' });

    // Get pending booking confirmations
    const pendingConfirmations = await Booking.countDocuments({ status: 'pending' });

    // Get recent transactions
    const recentTransactions = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('booking')
      .populate('user', 'name');

    // Get pending payment list
    const pendingPaymentList = await Payment.find({ status: 'pending' })
      .populate('user', 'name email')
      .populate('booking');

    // Get pending booking confirmations list
    const pendingConfirmationList = await Booking.find({ status: 'pending' })
      .populate('user', 'name email')
      .populate('kost', 'name');

    res.status(200).json({
      success: true,
      data: {
        pendapatanBulanan: revenue,
        pembayaranTertunda: pendingPayments,
        menungguKonfirmasi: pendingConfirmations,
        detailTransaksi: recentTransactions,
        pembayaranTertundaList: pendingPaymentList,
        konfirmasiSewaList: pendingConfirmationList
      }
    });
  } catch (error) {
    console.error('Error getting payment statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Confirm booking
// @route   PUT /api/admin/bookings/:id/confirm
// @access  Private/Admin
exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = 'confirmed';
    await booking.save();

    // Update room availability
    await Kost.updateOne(
      { 'rooms._id': booking.room },
      { $set: { 'rooms.$.isAvailable': false } }
    );

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Verify payment
// @route   PUT /api/admin/payments/:id/verify
// @access  Private/Admin
exports.verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    payment.status = 'completed';
    payment.verifiedAt = Date.now();
    await payment.save();

    // Update booking status
    await Booking.findByIdAndUpdate(payment.booking, {
      status: 'confirmed',
      paymentStatus: 'paid'
    });

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
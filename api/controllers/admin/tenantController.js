const User = require('../../models/User');
const Booking = require('../../models/Booking');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

// @desc    Get all tenants (penghuni)
// @route   GET /api/admin/tenants
// @access  Private/Admin
exports.getTenants = asyncHandler(async (req, res, next) => {
  // Bisa tambahkan filter pencarian jika perlu (nama, email, dsb)
  const { search, status } = req.query;
  let query = { role: 'user' };
  if (status) query.status = status;
  if (search) query.name = { $regex: search, $options: 'i' };
  const tenants = await User.find(query).select('-password');
  res.status(200).json({ success: true, count: tenants.length, data: tenants });
});

// @desc    Get single tenant
// @route   GET /api/admin/tenants/:id
// @access  Private/Admin
exports.getTenant = asyncHandler(async (req, res, next) => {
  const tenant = await User.findById(req.params.id).select('-password');
  if (!tenant || tenant.role !== 'user') {
    return next(new ErrorResponse('Penghuni tidak ditemukan', 404));
  }
  res.status(200).json({ success: true, data: tenant });
});

// @desc    Update tenant
// @route   PUT /api/admin/tenants/:id
// @access  Private/Admin
exports.updateTenant = asyncHandler(async (req, res, next) => {
  let tenant = await User.findById(req.params.id);
  if (!tenant || tenant.role !== 'user') {
    return next(new ErrorResponse('Penghuni tidak ditemukan', 404));
  }
  // Tidak boleh update password dari sini
  const updateData = { ...req.body };
  delete updateData.password;
  tenant = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select('-password');
  res.status(200).json({ success: true, data: tenant });
});

// @desc    Delete tenant
// @route   DELETE /api/admin/tenants/:id
// @access  Private/Admin
exports.deleteTenant = asyncHandler(async (req, res, next) => {
  const tenant = await User.findById(req.params.id);
  if (!tenant || tenant.role !== 'user') {
    return next(new ErrorResponse('Penghuni tidak ditemukan', 404));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get tenant's bookings
// @route   GET /api/admin/tenants/:id/bookings
// @access  Private/Admin
exports.getTenantBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.params.id })
    .populate('kost', 'name')
    .populate('roomNumber');
  res.status(200).json({ success: true, count: bookings.length, data: bookings });
});

const User = require('../../models/User');
const { cloudinary } = require('../../config/cloudinary');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  
  if (!user) {
    return next(new ErrorResponse('User tidak ditemukan', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private/Admin
exports.updateProfile = asyncHandler(async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    
    // Handle profile picture upload
    if (req.files && req.files.profilePicture) {
      const result = await cloudinary.uploader.upload(req.files.profilePicture.path, {
        folder: 'dkost-profiles',
        width: 300,
        height: 300,
        crop: 'fill'
      });
      
      updateData.profilePicture = result.secure_url;
    }

    // Remove password from update data (use separate endpoint)
    delete updateData.password;
    delete updateData.role;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    next(new ErrorResponse('Gagal update profil', 500));
  }
});

// @desc    Change password
// @route   PUT /api/admin/profile/password
// @access  Private/Admin
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new ErrorResponse('Password lama dan baru harus diisi', 400));
  }

  const user = await User.findById(req.user.id);

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return next(new ErrorResponse('Password lama tidak sesuai', 400));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password berhasil diubah'
  });
});

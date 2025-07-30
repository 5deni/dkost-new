const { cloudinary } = require('../../config/cloudinary');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

// @desc    Get all gallery images
// @route   GET /api/admin/gallery
// @access  Private/Admin
exports.getGallery = asyncHandler(async (req, res, next) => {
  // Mock data untuk gallery - bisa diganti dengan model Gallery jika ada
  const gallery = [
    {
      _id: '1',
      title: 'Kamar Standard',
      mediaUrl: 'https://via.placeholder.com/400x200?text=Kamar+Standard',
      kostId: null
    },
    {
      _id: '2', 
      title: 'Kamar Deluxe',
      mediaUrl: 'https://via.placeholder.com/400x200?text=Kamar+Deluxe',
      kostId: null
    }
  ];

  res.status(200).json({
    success: true,
    count: gallery.length,
    data: gallery
  });
});

// @desc    Upload gallery image
// @route   POST /api/admin/gallery
// @access  Private/Admin
exports.uploadGalleryImage = asyncHandler(async (req, res, next) => {
  try {
    const { title, kostId } = req.body;
    
    if (!req.files || !req.files.image) {
      return next(new ErrorResponse('Silakan upload gambar', 400));
    }

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.files.image.path, {
      folder: 'dkost-gallery',
      width: 800,
      height: 600,
      crop: 'limit'
    });

    const galleryItem = {
      _id: Date.now().toString(),
      title: title || 'Gallery Image',
      mediaUrl: result.secure_url,
      publicId: result.public_id,
      kostId: kostId || null
    };

    res.status(201).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    next(new ErrorResponse('Gagal upload gambar', 500));
  }
});

// @desc    Delete gallery image
// @route   DELETE /api/admin/gallery/:id
// @access  Private/Admin
exports.deleteGalleryImage = asyncHandler(async (req, res, next) => {
  try {
    // Mock delete - implementasi sesuai dengan model Gallery jika ada
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    next(new ErrorResponse('Gagal hapus gambar', 500));
  }
});

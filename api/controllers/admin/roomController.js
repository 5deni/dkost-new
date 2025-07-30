const { cloudinary } = require('../../config/cloudinary');
const Room = require('../../models/Room');
const Kost = require('../../models/Kost');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

// @desc    Get all rooms
// @route   GET /api/admin/rooms
// @access  Private/Admin
exports.getRooms = asyncHandler(async (req, res, next) => {
  const rooms = await Room.find().populate('kost', 'name address');
  
  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms
  });
});

// @desc    Get single room
// @route   GET /api/admin/rooms/:id
// @access  Private/Admin
exports.getRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id).populate('kost', 'name address');

  if (!room) {
    return next(
      new ErrorResponse(`No room found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: room
  });
});

// @desc    Create room
// @route   POST /api/admin/rooms
// @access  Private/Admin
exports.createRoom = asyncHandler(async (req, res, next) => {
  try {
    const roomData = { ...req.body };
    
    // Verify kost exists
    const kost = await Kost.findById(roomData.kost);
    if (!kost) {
      return next(new ErrorResponse(`Kost dengan ID ${roomData.kost} tidak ditemukan`, 404));
    }
    
    // Handle facilities string to array conversion if needed
    if (typeof roomData.facilities === 'string') {
      roomData.facilities = roomData.facilities.split(',').map(f => f.trim());
    }

    // Handle image uploads if any
    if (req.files && req.files.images) {
      const uploadPromises = req.files.images.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: 'dkost-rooms',
          width: 1000,
          height: 1000,
          crop: 'limit'
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      roomData.images = uploadResults.map(result => ({
        url: result.secure_url,
        publicId: result.public_id
      }));
    }

    // Create the room
    const room = await Room.create(roomData);

    res.status(201).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error creating room:', error);
    next(new ErrorResponse('Gagal membuat kamar', 500));
  }
});

// @desc    Update room
// @route   PUT /api/admin/rooms/:id
// @access  Private/Admin
exports.updateRoom = asyncHandler(async (req, res, next) => {
  try {
    let room = await Room.findById(req.params.id);

    if (!room) {
      return next(
        new ErrorResponse(`No room with the id of ${req.params.id}`, 404)
      );
    }

    const updateData = { ...req.body };

    // Handle facilities update
    if (updateData.facilities) {
      if (typeof updateData.facilities === 'string') {
        updateData.facilities = updateData.facilities.split(',').map(f => f.trim());
      }
    }

    // Handle image uploads if any
    if (req.files && req.files.images) {
      // Delete old images from Cloudinary if needed
      if (room.images && room.images.length > 0) {
        const deletePromises = room.images.map(image => 
          cloudinary.uploader.destroy(image.publicId)
        );
        await Promise.all(deletePromises);
      }

      // Upload new images
      const uploadPromises = req.files.images.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: 'dkost-rooms',
          width: 1000,
          height: 1000,
          crop: 'limit'
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      updateData.images = uploadResults.map(result => ({
        url: result.secure_url,
        publicId: result.public_id
      }));
    }

    // Update the room
    room = await Room.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error updating room:', error);
    next(new ErrorResponse('Failed to update room', 500));
  }
});

// @desc    Delete room
// @route   DELETE /api/admin/rooms/:id
// @access  Private/Admin
exports.deleteRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(
      new ErrorResponse(`Kamar dengan ID ${req.params.id} tidak ditemukan`, 404)
    );
  }

  // Delete images from cloudinary if they exist
  if (room.images && room.images.length > 0) {
    try {
      const deletePromises = room.images.map(image => 
        cloudinary.uploader.destroy(image.publicId)
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error deleting images from cloudinary:', error);
    }
  }

  await Room.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

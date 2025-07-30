const Kost = require('../models/Kost');
const Room = require('../models/Room');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all kost (public)
// @route   GET /api/kost
// @access  Public
exports.getAllKost = asyncHandler(async (req, res, next) => {
  const { search, minPrice, maxPrice, location, facilities } = req.query;
  
  let query = { isAvailable: true };
  
  // Search by name or location
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Filter by location
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }
  
  // Filter by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }
  
  // Filter by facilities
  if (facilities) {
    const facilityArray = facilities.split(',');
    query.facilities = { $in: facilityArray };
  }

  const kosts = await Kost.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: kosts.length,
    data: kosts
  });
});

// @desc    Get single kost (public)
// @route   GET /api/kost/:id
// @access  Public
exports.getKost = asyncHandler(async (req, res, next) => {
  const kost = await Kost.findById(req.params.id);

  if (!kost) {
    return next(new ErrorResponse('Kost tidak ditemukan', 404));
  }

  // Get available rooms for this kost
  const rooms = await Room.find({ 
    kost: req.params.id,
    isAvailable: true 
  }).sort({ price: 1 });

  res.status(200).json({
    success: true,
    data: {
      ...kost.toObject(),
      rooms
    }
  });
});

// @desc    Get kost rooms
// @route   GET /api/kost/:id/rooms
// @access  Public
exports.getKostRooms = asyncHandler(async (req, res, next) => {
  const { type, minPrice, maxPrice } = req.query;
  
  let query = { 
    kost: req.params.id,
    isAvailable: true 
  };
  
  // Filter by room type
  if (type) {
    query.type = type;
  }
  
  // Filter by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }

  const rooms = await Room.find(query)
    .populate('kost', 'name location')
    .sort({ price: 1 });

  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms
  });
});

// @desc    Search kost
// @route   GET /api/kost/search
// @access  Public
exports.searchKost = asyncHandler(async (req, res, next) => {
  const { q, location, minPrice, maxPrice, facilities, sortBy } = req.query;
  
  let query = { isAvailable: true };
  
  // Text search
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { location: { $regex: q, $options: 'i' } }
    ];
  }
  
  // Location filter
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }
  
  // Price range filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }
  
  // Facilities filter
  if (facilities) {
    const facilityArray = facilities.split(',');
    query.facilities = { $all: facilityArray };
  }

  // Sorting
  let sortOptions = { createdAt: -1 };
  if (sortBy === 'price_low') sortOptions = { price: 1 };
  if (sortBy === 'price_high') sortOptions = { price: -1 };
  if (sortBy === 'name') sortOptions = { name: 1 };

  const kosts = await Kost.find(query).sort(sortOptions);

  res.status(200).json({
    success: true,
    count: kosts.length,
    data: kosts
  });
});

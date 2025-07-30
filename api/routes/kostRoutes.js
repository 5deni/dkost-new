const express = require('express');
const router = express.Router();
const {
  getAllKost,
  getKost,
  getKostRooms,
  searchKost
} = require('../controllers/kostController');

// Public routes
router.get('/search', searchKost);
router.get('/:id/rooms', getKostRooms);
router.get('/:id', getKost);
router.get('/', getAllKost);

module.exports = router;

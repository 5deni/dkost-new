const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../../middleware/auth');
const { storage } = require('../../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../../controllers/admin/roomController');

// Apply auth middleware to all routes
router.use(verifyToken);
router.use(isAdmin);

router.route('/')
  .get(getRooms)
  .post(upload.array('images', 10), createRoom);

router.route('/:id')
  .get(getRoom)
  .put(upload.array('images', 10), updateRoom)
  .delete(deleteRoom);

module.exports = router;
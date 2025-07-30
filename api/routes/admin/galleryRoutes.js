const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../../middleware/auth');
const { storage } = require('../../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

const {
  getGallery,
  uploadGalleryImage,
  deleteGalleryImage
} = require('../../controllers/admin/galleryController');

// Apply auth middleware to all routes
router.use(verifyToken);
router.use(isAdmin);

router.route('/')
  .get(getGallery)
  .post(upload.single('image'), uploadGalleryImage);

router.route('/:id')
  .delete(deleteGalleryImage);

module.exports = router;

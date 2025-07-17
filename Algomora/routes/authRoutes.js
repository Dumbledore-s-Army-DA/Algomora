const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  signup,
  login,
  getUserById,
  uploadPhoto,
  updateUserHouse   // ✅ Add this
} = require('../controllers/authController');

const router = express.Router();

// Multer config for profile photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', getUserById);
router.patch('/:id', updateUserHouse);  // ✅ New route for house update
router.post('/uploadPhoto/:id', upload.single('photo'), uploadPhoto);

module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const { signup, login, getUserById, uploadPhoto } = require('../controllers/authController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', getUserById);
router.post('/uploadPhoto/:id', upload.single('photo'), uploadPhoto);

module.exports = router;

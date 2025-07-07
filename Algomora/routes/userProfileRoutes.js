const express = require('express');
const router = express.Router();
const { saveUserProfile } = require('../controllers/userProfileController');

router.post('/', saveUserProfile); // POST /api/userProfile

module.exports = router;

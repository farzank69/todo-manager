const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { getCurrentUser, updateProfile } = require('../controllers/auth.controller');

router.get('/me', authenticate, getCurrentUser);
router.put('/profile', authenticate, updateProfile);

module.exports = router;
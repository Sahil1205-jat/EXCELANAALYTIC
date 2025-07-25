const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/files/upload
// @desc    Upload an Excel file
// @access  Private
router.post('/upload', authMiddleware, fileController.uploadFile);

// @route   GET api/files/history
// @desc    Get user's upload history
// @access  Private
router.get('/history', authMiddleware, fileController.getUploadHistory);

// Export the router once at the end
module.exports = router;
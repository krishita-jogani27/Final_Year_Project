const express = require('express');
const router = express.Router();
const { getColleges } = require('../controllers/collegeController');
const { protect } = require('../middleware/auth');

// @route   GET /api/colleges
// @desc    Get nearby government colleges based on location and degree
// @access  Protected
router.get('/', protect, getColleges);

module.exports = router;

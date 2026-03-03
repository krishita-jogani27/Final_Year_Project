const express = require('express');
const router = express.Router();
const { getCareerDetails } = require('../controllers/careerController');
const { protect } = require('../middleware/auth');

// @route   GET /api/career/:id
// @desc    Get detailed path, exams, and timeline for a career
// @access  Protected
router.get('/:id', protect, getCareerDetails);

module.exports = router;

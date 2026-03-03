const express = require('express');
const router = express.Router();
const { generateRecommendations, getDegreeRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middleware/auth');

// @route   POST /api/recommendations/generate
// @desc    Generate career recommendations using AI
// @access  Protected
router.post('/generate', protect, generateRecommendations);

// @route   GET /api/recommendations
// @desc    Get top degrees based on quiz results
// @access  Protected
router.get('/', protect, getDegreeRecommendations);

module.exports = router;

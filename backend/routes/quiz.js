const express = require('express');
const router = express.Router();
const { startQuiz, submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

// @route   GET /api/quiz/start
// @desc    Get 10 random quiz questions with options (no answers)
// @access  Public (or protected if you add auth middleware)
router.get('/start', startQuiz);

// @route   POST /api/quiz/submit
// @desc    Submit Quiz Answers and calculate score
// @access  Protected
router.post('/submit', protect, submitQuiz);

module.exports = router;

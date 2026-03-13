const express = require('express');
const router = express.Router();
const { getCareerTimeline } = require('../controllers/timelineController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCareerTimeline);

module.exports = router;

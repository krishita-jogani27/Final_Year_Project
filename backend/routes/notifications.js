const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, triggerEventNotifications } = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Protected
router.get('/', protect, getNotifications);

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Protected
router.put('/:id/read', protect, markAsRead);

// @route   POST /api/notifications/trigger
// @desc    Trigger system notifications (Task 13.2)
// @access  Public (for demo) / Should be Admin-restricted in prod
router.post('/trigger', triggerEventNotifications);

module.exports = router;

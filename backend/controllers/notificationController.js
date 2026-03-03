const { pool: db } = require('../config/db');

// @desc    Get all notifications for the logged-in user
// @route   GET /api/notifications
// @access  Protected
exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const [notifications] = await db.query(
            'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications'
        });
    }
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Protected
exports.markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user.id;

        const [result] = await db.query(
            'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
            [notificationId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        res.status(200).json({ success: true, message: 'Notification marked as read' });

    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ success: false, message: 'Failed to update notification' });
    }
};

// @desc    Admin/System Trigger to Generate Notifications based on career interests
// @route   POST /api/notifications/trigger
// @access  Private/System
exports.triggerEventNotifications = async (req, res) => {
    try {
        const { event_type, message } = req.body;

        // Examples: 'JEE_REGISTRATION', 'UPSC_APPLICATION', 'COLLEGE_DEADLINE'
        let targetUsersQuery = '';
        let queryParams = [];

        // Logic (Task 13.2): Target specific users based on their quiz categories or enrolled courses 
        // For simplicity in this demo, let's notify all users or assume basic targeting
        if (event_type === 'JEE_REGISTRATION') {
            // In a real app, query users whose recommended degrees are B.Tech
            targetUsersQuery = 'SELECT id FROM users';
        } else if (event_type === 'UPSC_APPLICATION') {
            targetUsersQuery = 'SELECT id FROM users';
        } else {
            targetUsersQuery = 'SELECT id FROM users';
        }

        const [users] = await db.query(targetUsersQuery, queryParams);

        if (users.length === 0) {
            return res.status(200).json({ success: true, message: 'No eligible users to notify.' });
        }

        // Bulk insert notifications
        const notificationValues = users.map(user => [user.id, message]);
        await db.query(
            'INSERT INTO notifications (user_id, message) VALUES ?',
            [notificationValues]
        );

        res.status(201).json({
            success: true,
            message: `Successfully dispatched notification to ${users.length} users.`,
            event: event_type
        });

    } catch (error) {
        console.error('Error triggering notifications:', error);
        res.status(500).json({ success: false, message: 'Failed to trigger notifications' });
    }
};

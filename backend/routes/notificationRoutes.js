const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    createNotification,
    getAllNotifications,
    getNotificationById,
    markAsRead,
    deleteNotification
} = require('../controllers/NotificationController');

// Create notification
router.post(
    '/',
    authMiddleware,
    createNotification
);

// Get all notifications
router.get(
    '/',
    authMiddleware,
    getAllNotifications
);

// Get single notification
router.get(
    '/:id',
    authMiddleware,
    getNotificationById
);

// Mark notification as read
router.patch(
    '/:id/read',
    authMiddleware,
    markAsRead
);

// Delete notification
router.delete(
    '/:id',
    authMiddleware,
    deleteNotification
);

module.exports = router;
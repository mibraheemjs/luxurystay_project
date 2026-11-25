const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const {
    createAnnouncement,
    getAllAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement
} = require('../controllers/AnnouncementController');

// Create announcement
router.post(
    '/',
    authMiddleware,
    authorize('admin', 'manager'),
    createAnnouncement
);

// Get all announcements
router.get(
    '/',
    authMiddleware,
    getAllAnnouncements
);

// Get announcement by ID
router.get(
    '/:id',
    authMiddleware,
    getAnnouncementById
);

// Update announcement
router.put(
    '/:id',
    authMiddleware,
    authorize('admin', 'manager'),
    updateAnnouncement
);

// Delete announcement
router.delete(
    '/:id',
    authMiddleware,
    authorize('admin'),
    deleteAnnouncement
);

module.exports = router;
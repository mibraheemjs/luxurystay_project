
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const {
    createSettings,
    getSettings,
    updateSettings
} = require('../controllers/settingController');

// Create Settings
router.post(
    '/',
    authMiddleware,
    authorize('admin'),
    createSettings
);

// Get Settings
router.get(
    '/',
    authMiddleware,
    authorize('admin'),
    getSettings
);

// Update Settings
router.put(
    '/',
    authMiddleware,
    authorize('admin'),
    updateSettings
);

module.exports = router;

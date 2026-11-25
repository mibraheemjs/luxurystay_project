
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');
const {
    getDashboardReport,
    getMonthlyReport,
    getRoomTypeAnalytics,
    getFeedbackAnalytics
} = require('../controllers/reportController');
router.get(
    '/dashboard',
    authMiddleware,
    authorize('admin', 'manager'),
    getDashboardReport
);
router.get(
    '/monthly',
    authMiddleware,
    authorize('admin', 'manager'),
    getMonthlyReport
);
router.get(
    '/room-types',
    authMiddleware,
    authorize('admin', 'manager'),
    getRoomTypeAnalytics
);

router.get(
    '/feedback',
    authMiddleware,
    authorize('admin', 'manager'),
    getFeedbackAnalytics
);

module.exports = router;

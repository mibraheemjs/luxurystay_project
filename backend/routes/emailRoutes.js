const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const {
    sendTestEmail,sendBookingConfirmationEmail
} = require('../controllers/emailController');

// Test Email
router.post(
    '/test',
    authMiddleware,
    authorize('admin'),
    sendTestEmail
);
// Send Booking Confirmation Email
router.post(
    '/booking/:id',
    authMiddleware,
    authorize('admin'),
    sendBookingConfirmationEmail
);

module.exports = router;
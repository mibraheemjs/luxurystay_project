
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const {
    createReview,
    getReviews,
    getSingleReview,
    updateReview,
    deleteReview
} = require('../controllers/ReviewController');

// Create Review - Guest only
router.post('/', authMiddleware, authorize('guest'), createReview);

// Get All Reviews - Admin, Manager and Guest
router.get('/', authMiddleware, authorize('admin', 'manager', 'guest'), getReviews);

// Get Single Review - Admin and Manager
router.get('/:id', authMiddleware, authorize('admin', 'manager'), getSingleReview);

// Update Review - Admin and Manager
router.put('/:id', authMiddleware, authorize('guest'), updateReview);

// Delete Review - Admin only
router.delete('/:id', authMiddleware, authorize('admin'), deleteReview);

module.exports = router;

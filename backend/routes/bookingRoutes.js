const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const {
    createBooking,
    getBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/BookingController');

router.post('/', authMiddleware, authorize('guest'), createBooking);
router.get('/', authMiddleware, authorize('admin', 'manager'), getBookings);
router.get('/:id', authMiddleware, authorize('admin', 'manager', 'guest'), getSingleBooking);
router.put('/:id', authMiddleware, authorize('admin', 'manager'), updateBooking);
router.delete('/:id', authMiddleware, authorize('admin'), deleteBooking);
module.exports = router;
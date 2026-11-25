
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const {
    createServiceOrder,
    getServiceOrders,
    getSingleServiceOrder,
    updateServiceOrder,
    deleteServiceOrder
} = require('../controllers/ServiceOrderController');

// Create Service Order - Guest only
router.post('/', authMiddleware, authorize('guest'), createServiceOrder);

// Get All Service Orders - Admin and Manager
router.get('/', authMiddleware, authorize('admin', 'manager', 'guest'), getServiceOrders);

// Get Single Service Order - Admin, Manager and Guest
router.get('/:id', authMiddleware, authorize('admin', 'manager', 'guest'), getSingleServiceOrder);

// Update Service Order - Admin and Manager
router.put('/:id', authMiddleware, authorize('admin', 'manager'), updateServiceOrder);

// Delete Service Order - Admin only
router.delete('/:id', authMiddleware, authorize('admin'), deleteServiceOrder);

module.exports = router;

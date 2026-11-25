const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');
const {
    createPayment,
    getPayments,
    getSinglePayment,
    updatePayment,
    deletePayment
} = require('../controllers/PaymentController');

router.post(
    '/',
    authMiddleware,
    authorize('admin', 'manager', 'receptionist', 'guest'),
    createPayment
);

router.get(
    '/',
    authMiddleware,
    authorize('admin', 'manager', 'receptionist', 'guest'),
    getPayments
);

router.get(
    '/:id',
    authMiddleware,
    authorize('admin', 'manager', 'receptionist', 'guest'),
    getSinglePayment
);

router.put(
    '/:id',
    authMiddleware,
    authorize('admin', 'manager', 'receptionist'),
    updatePayment
);

router.delete(
    '/:id',
    authMiddleware,
    authorize('admin', 'manager'),
    deletePayment
);

module.exports = router;
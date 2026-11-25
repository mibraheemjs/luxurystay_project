const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');
const {
    createInvoice,
    getInvoiceById,
    generateInvoicePDF
} = require('../controllers/invoiceController');

// Create Invoice
router.post(
    '/',
    authMiddleware,
    authorize('admin', 'manager', 'receptionist'),
    createInvoice
);
// Get Invoice By ID
router.get(
    '/:id',
    authMiddleware,
    authorize('admin', 'manager', 'receptionist'),
    getInvoiceById
);

// Generate Invoice PDF
router.get(
    '/:id/pdf',
    authMiddleware,
    authorize('admin', 'manager', 'receptionist'),
    generateInvoicePDF
);
module.exports = router;
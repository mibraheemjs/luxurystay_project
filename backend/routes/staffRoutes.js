
const express = require('express');
const router = express.Router();

const {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deactivateStaff
} = require('../controllers/StaffController');

const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

// Only admins can manage staff accounts
router.post('/', authMiddleware, authorize('admin'), createStaff);
router.get('/', authMiddleware, authorize('admin'), getAllStaff);
router.get('/:id', authMiddleware, authorize('admin'), getStaffById);
router.put('/:id', authMiddleware, authorize('admin'), updateStaff);
router.patch('/:id/deactivate', authMiddleware, authorize('admin'), deactivateStaff);

module.exports = router;

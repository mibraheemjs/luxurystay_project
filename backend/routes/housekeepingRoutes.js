
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');


const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/HousekeepingController');
// Create task
router.post('/', authMiddleware, authorize('admin', 'manager'), createTask);

// Get all tasks
router.get('/', authMiddleware, authorize('admin', 'manager', 'housekeeping'), getAllTasks);

// Get task by ID
router.get('/:id', authMiddleware, authorize('admin', 'manager', 'housekeeping'), getTaskById);

// Update task
router.put('/:id', authMiddleware, authorize('admin', 'manager', 'housekeeping'), updateTask);

// Delete task
router.delete('/:id', authMiddleware, authorize('admin', 'manager'), deleteTask);

module.exports = router;


const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    createService,
    getServices,
    getSingleService,
    updateService,
    deleteService
} = require('../controllers/ServiceController');

router.post('/', authMiddleware, createService);
router.get('/', authMiddleware, getServices);
router.get('/:id', authMiddleware, getSingleService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

module.exports = router;

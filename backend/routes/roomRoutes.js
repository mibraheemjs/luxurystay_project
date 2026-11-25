const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const { createRoom,
    getRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom
 } = require('../controllers/RoomController');

router.post('/', authMiddleware, authorize('admin', 'manager'), createRoom);

router.get('/', authMiddleware, getRooms);

router.get('/:id', authMiddleware, getSingleRoom);

router.put('/:id', authMiddleware, authorize('admin', 'manager'), updateRoom);

router.delete('/:id', authMiddleware, authorize('admin'), deleteRoom);

module.exports = router;


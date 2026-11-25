
const Room = require('../models/Room');
const Booking = require('../models/Booking');

// Create New Room
const createRoom = async (req, res) => {

    try {

        const {
            roomNumber,
            roomType,
            price,
            capacity,
            description
        } = req.body;

        // Required fields validation
        if (!roomNumber || !roomType || price === undefined || capacity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required room details'
            });
        }

        // Price validation
        if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Room price must be greater than 0'
            });
        }

        // Capacity validation
        if (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Room capacity must be a positive integer'
            });
        }

        // Check duplicate room number
        const existingRoom = await Room.findOne({ roomNumber });

        if (existingRoom) {
            return res.status(409).json({
                success: false,
                message: 'Room number already exists'
            });
        }

        const newRoom = new Room({
            roomNumber,
            roomType,
            price,
            capacity,
            description
        });

        await newRoom.save();

        res.status(201).json({
            success: true,
            message: 'Room created successfully',
            room: newRoom
        });

    } catch (error) {

        res.status(error.name === 'ValidationError' ? 400 : 500).json({
            success: false,
            message: error.message
        });

    }

};


// Get All Rooms
const getRooms = async (req, res) => {

    try {

        const rooms = await Room.find();

        res.status(200).json({
            success: true,
            count: rooms.length,
            rooms
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Single Room
const getSingleRoom = async (req, res) => {

    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            room
        });

    } catch (error) {

        res.status(error.name === 'CastError' ? 400 : 500).json({
            success: false,
            message: error.message
        });

    }

};


// Update Room
const updateRoom = async (req, res) => {

    try {

        const {
            roomNumber,
            roomType,
            price,
            capacity,
            status,
            description
        } = req.body;

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Validate price if provided
        if (price !== undefined &&
            (!Number.isFinite(Number(price)) || Number(price) <= 0)) {
            return res.status(400).json({
                success: false,
                message: 'Room price must be greater than 0'
            });
        }

        // Validate capacity if provided
        if (capacity !== undefined &&
            (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0)) {
            return res.status(400).json({
                success: false,
                message: 'Room capacity must be a positive integer'
            });
        }

        // Check duplicate room number
        if (roomNumber !== undefined) {

            const existingRoom = await Room.findOne({
                roomNumber,
                _id: { $ne: room._id }
            });

            if (existingRoom) {
                return res.status(409).json({
                    success: false,
                    message: 'Room number already exists'
                });
            }

            room.roomNumber = roomNumber;
        }

        if (roomType !== undefined) room.roomType = roomType;
        if (price !== undefined) room.price = price;
        if (capacity !== undefined) room.capacity = capacity;
        if (status !== undefined) room.status = status;
        if (description !== undefined) room.description = description;

        await room.save();

        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            room
        });

    } catch (error) {

        res.status(
            error.name === 'ValidationError' ||
            error.name === 'CastError' ? 400 : 500
        ).json({
            success: false,
            message: error.message
        });

    }

};


// Delete Room
const deleteRoom = async (req, res) => {

    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check whether this room has booking history
        const existingBooking = await Booking.findOne({
            room: room._id
        });

        if (existingBooking) {
            return res.status(409).json({
                success: false,
                message: 'Room cannot be deleted because booking records exist'
            });
        }

        await room.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Room deleted successfully'
        });

    } catch (error) {

        res.status(error.name === 'CastError' ? 400 : 500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    createRoom,
    getRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom
};

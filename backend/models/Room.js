const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({

    roomNumber: {
        type: String,
        required: true,
        unique: true
    },

    roomType: {
        type: String,
        enum: ['Single', 'Double', 'Deluxe', 'Suite'],
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    capacity: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Cleaning', 'Maintenance'],
        default: 'Available'
    },

    description: {
        type: String
    }

}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
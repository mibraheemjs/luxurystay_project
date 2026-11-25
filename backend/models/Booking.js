
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },

    guestDetails: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        idType: {
            type: String,
            required: true,
            enum: ['CNIC', 'Passport', 'Other']
        },
        idNumber: {
            type: String,
            required: true
        },
        preference: {
            type: String,
            default: ''
        },
        notes: {
            type: String,
            default: ''
        }
    },

    checkIn: {
        type: Date,
        required: true
    },

    checkOut: {
        type: Date,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Checked-In', 'Checked-Out', 'Cancelled'],
        default: 'Pending'
    }

}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;


const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({

    hotelName: {
        type: String,
        required: true
    },

    checkInTime: {
        type: String,
        default: '02:00 PM'
    },

    checkOutTime: {
        type: String,
        default: '12:00 PM'
    },

    taxPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    cancellationPolicy: {
        type: String,
        default: 'Cancellation policy not set'
    },

    notifications: {
        booking: {
            type: Boolean,
            default: true
        },

        maintenance: {
            type: Boolean,
            default: true
        },

        criticalUpdates: {
            type: Boolean,
            default: true
        }
    }

}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;

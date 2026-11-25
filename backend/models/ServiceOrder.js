const mongoose = require('mongoose');

const serviceOrderSchema = new mongoose.Schema({

    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },

    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },

    quantity: {
        type: Number,
        default: 1,
         min: 1
    },

    totalPrice: {
        type: Number,
        required: true,
          min: 0
    },

    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    }

}, { timestamps: true });

const ServiceOrder = mongoose.model('ServiceOrder', serviceOrderSchema);

module.exports = ServiceOrder;
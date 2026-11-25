const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },


    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },

    remainingBalance: {
        type: Number,
        default: 0,
        min: 0
    },

    paymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Online'],
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Pending'
    },

    transactionId: {
        type: String
    },

    paymentDate: {
        type: Date
    }

}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
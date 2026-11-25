const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
        unique: true
    },

    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },

    nights: {
        type: Number,
        required: true
    },

    roomCharges: {
        type: Number,
        required: true
    },

    serviceCharges: [{
        serviceName: String,
        quantity: Number,
        unitPrice: Number,
        totalPrice: Number
    }],

    subtotal: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
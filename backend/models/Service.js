const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    serviceName: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true,
          min: 0
    },

    category: {
        type: String,
        enum: ['Food', 'Laundry', 'Transportation', 'Room Service', 'Other'],
        required: true
    },

    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available'
    }

}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
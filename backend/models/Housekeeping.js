const mongoose = require('mongoose');

const housekeepingSchema = new mongoose.Schema({

    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    task: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },

    notes: {
        type: String
    }

}, { timestamps: true });

const Housekeeping = mongoose.model('Housekeeping', housekeepingSchema);

module.exports = Housekeeping;
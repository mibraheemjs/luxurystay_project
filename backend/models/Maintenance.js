const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({

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

    issue: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    cost: {
        type: Number,
        default: 0,
        min: 0
    },

    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    }

}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
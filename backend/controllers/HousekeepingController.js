
const Housekeeping = require('../models/Housekeeping');

// Create Housekeeping Task
const createTask = async (req, res) => {
    try {
        const { room, assignedTo, task, notes } = req.body;

        if (!room || !assignedTo || !task) {
            return res.status(400).json({
                success: false,
                message: 'Room, assigned staff and task are required'
            });
        }

        const newTask = new Housekeeping({
            room,
            assignedTo,
            task,
            notes
        });

        await newTask.save();

        res.status(201).json({
            success: true,
            message: 'Housekeeping task created successfully',
            housekeeping: newTask
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Get All Housekeeping Tasks
const getAllTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === 'housekeeping') {

            tasks = await Housekeeping.find({
                assignedTo: req.user.id
            })
                .populate('room')
                .populate('assignedTo', 'name email role')
                .sort({ createdAt: -1 });

        } else {

            tasks = await Housekeeping.find()
                .populate('room')
                .populate('assignedTo', 'name email role')
                .sort({ createdAt: -1 });
        }

        res.status(200).json({
            success: true,
            count: tasks.length,
            housekeeping: tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Housekeeping Task

const getTaskById = async (req, res) => {
    try {
        let task;

        if (req.user.role === 'housekeeping') {

            task = await Housekeeping.findOne({
                _id: req.params.id,
                assignedTo: req.user.id
            })
                .populate('room')
                .populate('assignedTo', 'name email role');

        } else {

            task = await Housekeeping.findById(req.params.id)
                .populate('room')
                .populate('assignedTo', 'name email role');
        }

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Housekeeping task not found'
            });
        }

        res.status(200).json({
            success: true,
            housekeeping: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update Housekeeping Task
// Update Housekeeping Task
const updateTask = async (req, res) => {
    try {
        let updatedTask;

        if (req.user.role === 'housekeeping') {

            updatedTask = await Housekeeping.findOneAndUpdate(
                {
                    _id: req.params.id,
                    assignedTo: req.user.id
                },
                {
                    status: req.body.status,
                    notes: req.body.notes
                },
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate('room')
                .populate('assignedTo', 'name email role');

        } else {

            const { room, assignedTo, task, status, notes } = req.body;

            updatedTask = await Housekeeping.findByIdAndUpdate(
                req.params.id,
                { room, assignedTo, task, status, notes },
                { new: true, runValidators: true }
            )
                .populate('room')
                .populate('assignedTo', 'name email role');
        }

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Housekeeping task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Housekeeping task updated successfully',
            housekeeping: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Housekeeping Task
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Housekeeping.findByIdAndDelete(
            req.params.id
        );

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: 'Housekeeping task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Housekeeping task deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};

const bcrypt = require('bcryptjs');
const User = require('../models/User');

// CREATE STAFF
const createStaff = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, password and role.'
            });
        }

        const allowedRoles = [
            'manager',
            'receptionist',
            'housekeeping'
        ];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid staff role.'
            });
        }

        const existingStaff = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingStaff) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists.'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const staff = await User.create({
            name,
            email,
            password: hashedPassword,
            phone: req.body.phone,
            role
        });

        res.status(201).json({
            success: true,
            message: 'Staff account created successfully.',
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                isActive: staff.isActive
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL STAFF
const getAllStaff = async (req, res) => {
    try {
        const staff = await User.find({
            role: { $in: ['manager', 'receptionist', 'housekeeping'] }
        }).select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: staff.length,
            staff
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET STAFF BY ID
const getStaffById = async (req, res) => {
    try {
        const staff = await User.findOne({
            _id: req.params.id,
            role: { $in: ['manager', 'receptionist', 'housekeeping'] }
        }).select('-password');

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Staff member not found.'
            });
        }

        res.status(200).json({
            success: true,
            staff
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE STAFF
const updateStaff = async (req, res) => {
    try {
        const { name, email, role, isActive } = req.body;

        const staff = await User.findOne({
            _id: req.params.id,
            role: { $in: ['manager', 'receptionist', 'housekeeping'] }
        });

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Staff member not found.'
            });
        }

        const allowedRoles = [
            'manager',
            'receptionist',
            'housekeeping'
        ];

        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid staff role.'
            });
        }

        if (email && email.toLowerCase() !== staff.email) {
            const emailExists = await User.findOne({
                email: email.toLowerCase()
            });

            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already being used.'
                });
            }
        }

        if (name !== undefined) staff.name = name;
        if (email !== undefined) staff.email = email.toLowerCase();
        if (role !== undefined) staff.role = role;
        if (isActive !== undefined) staff.isActive = isActive;

        await staff.save();

        res.status(200).json({
            success: true,
            message: 'Staff updated successfully.',
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                isActive: staff.isActive
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DEACTIVATE STAFF
const deactivateStaff = async (req, res) => {
    try {
        const staff = await User.findOne({
            _id: req.params.id,
            role: { $in: ['manager', 'receptionist', 'housekeeping'] }
        });

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Staff member not found.'
            });
        }

        staff.isActive = false;
        await staff.save();

        res.status(200).json({
            success: true,
            message: 'Staff account deactivated successfully.'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deactivateStaff
};

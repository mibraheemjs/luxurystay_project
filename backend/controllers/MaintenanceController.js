const Maintenance = require("../models/Maintenance");
const Notification = require("../models/Notification");

// Create Maintenance
const createMaintenance = async (req, res) => {
    try {
        const { room, assignedTo, issue, description, cost, status } = req.body;

        const maintenance = await Maintenance.create({
            room,
            assignedTo,
            issue,
            description,
            cost,
            status
        });

        // Create Maintenance Notifications
        try {
            const notificationUsers = [
                ...new Set(
                    [req.user.id, assignedTo]
                        .filter(Boolean)
                        .map(id => id.toString())
                )
            ];

            await Notification.insertMany(
                notificationUsers.map(userId => ({
                    user: userId,
                    title: 'New Maintenance Report',
                    message: `A maintenance issue has been reported: ${issue}`,
                    type: 'Maintenance'
                }))
            );

        } catch (notificationError) {
            console.error(
                'Maintenance notification error:',
                notificationError.message
            );
        }
        res.status(201).json({
            success: true,
            message: "Maintenance record created successfully",
            maintenance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Maintenance Records
const getAllMaintenance = async (req, res) => {
    try {

        let maintenance;

        if (req.user.role === "housekeeping") {

            maintenance = await Maintenance.find({
                assignedTo: req.user.id
            })
                .populate("room")
                .populate("assignedTo", "-password")
                .sort({ createdAt: -1 });

        } else {

            maintenance = await Maintenance.find()
                .populate("room")
                .populate("assignedTo", "-password")
                .sort({ createdAt: -1 });

        }

        res.status(200).json({
            success: true,
            count: maintenance.length,
            maintenance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Maintenance By ID
const getMaintenanceById = async (req, res) => {
    try {

        let maintenance;

        if (req.user.role === "housekeeping") {

            maintenance = await Maintenance.findOne({
                _id: req.params.id,
                assignedTo: req.user.id
            })
                .populate("room")
                .populate("assignedTo", "-password");

        } else {

            maintenance = await Maintenance.findById(req.params.id)
                .populate("room")
                .populate("assignedTo", "-password");

        }

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found"
            });
        }

        res.status(200).json({
            success: true,
            maintenance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Maintenance
const updateMaintenance = async (req, res) => {
    try {

        let maintenance;

        if (req.user.role === "housekeeping") {

            maintenance = await Maintenance.findOneAndUpdate(
                {
                    _id: req.params.id,
                    assignedTo: req.user.id
                },
                {
                    status: req.body.status,
                    description: req.body.description
                },
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate("room")
                .populate("assignedTo", "-password");

        } else {

            maintenance = await Maintenance.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate("room")
                .populate("assignedTo", "-password");

        }

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Maintenance record updated successfully",
            maintenance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Maintenance
const deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndDelete(
            req.params.id
        );

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Maintenance record deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
};
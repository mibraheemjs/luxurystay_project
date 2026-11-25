
const Setting = require('../models/Setting');

// Create Hotel Settings
const createSettings = async (req, res) => {

    try {

        const existingSettings = await Setting.findOne();

        if (existingSettings) {
            return res.status(400).json({
                success: false,
                message: 'Hotel settings already exist'
            });
        }

        const settings = await Setting.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Hotel settings created successfully',
            settings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Hotel Settings
const getSettings = async (req, res) => {

    try {

        const settings = await Setting.findOne();

        if (!settings) {
            return res.status(404).json({
                success: false,
                message: 'Hotel settings not found'
            });
        }

        res.status(200).json({
            success: true,
            settings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Update Hotel Settings
const updateSettings = async (req, res) => {

    try {

        const allowedFields = [
            'hotelName',
            'checkInTime',
            'checkOutTime',
            'taxPercentage',
            'cancellationPolicy'
        ];

        const updateData = {};

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        // Update notification settings separately
        if (req.body.notifications) {

            const allowedNotifications = [
                'booking',
                'maintenance',
                'criticalUpdates'
            ];

            allowedNotifications.forEach(field => {

                if (req.body.notifications[field] !== undefined) {
                    updateData[`notifications.${field}`] =
                        req.body.notifications[field];
                }

            });

        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid settings provided'
            });
        }

        const settings = await Setting.findOneAndUpdate(
            {},
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        );

        if (!settings) {
            return res.status(404).json({
                success: false,
                message: 'Hotel settings not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Hotel settings updated successfully',
            settings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    createSettings,
    getSettings,
    updateSettings
};

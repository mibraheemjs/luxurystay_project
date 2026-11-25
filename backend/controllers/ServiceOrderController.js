const ServiceOrder = require('../models/ServiceOrder');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
// Create New Service Order
const createServiceOrder = async (req, res) => {
    try {
        const {
            booking,
            service,
            quantity
        } = req.body;

        const selectedBooking = await Booking.findById(booking);
        if (!selectedBooking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        if (selectedBooking.guest.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You cannot order service for another guest booking'
            });
        }
        if (!['Confirmed', 'Checked-In'].includes(selectedBooking.status)) {
            return res.status(400).json({
                success: false,
                message: 'Service can only be ordered for confirmed or checked-in bookings'
            });
        }
        const selectedService = await Service.findById(service);

        if (!selectedService) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        if (selectedService.status !== 'Available') {
            return res.status(400).json({
                success: false,
                message: 'Service is not available'
            });
        }

        if (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 1)) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be a positive whole number'
            });
        }

        const orderQuantity = quantity || 1;
        const totalPrice = selectedService.price * orderQuantity;

        const newServiceOrder = new ServiceOrder({
            guest: req.user.id,
            booking,
            service,
            quantity: orderQuantity,
            totalPrice
        });

        await newServiceOrder.save();

        res.status(201).json({
            success: true,
            message: 'Service order created successfully',
            serviceOrder: newServiceOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Service Orders
const getServiceOrders = async (req, res) => {
    try {
        const filter = req.user.role === 'guest'
            ? { guest: req.user.id }
            : {};

        const serviceOrders = await ServiceOrder.find(filter)
           .populate('guest', '-password')
            .populate('booking')
            .populate('service');

        res.status(200).json({
            success: true,
            count: serviceOrders.length,
            serviceOrders: serviceOrders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Service Order
const getSingleServiceOrder = async (req, res) => {
    try {
        const serviceOrder = await ServiceOrder.findById(req.params.id)
           .populate('guest', '-password')
            .populate('booking')
            .populate('service');

        if (!serviceOrder) {
            return res.status(404).json({
                success: false,
                message: 'Service order not found'
            });
        }
        if (
            req.user.role === 'guest' &&
            serviceOrder.guest._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: 'You cannot access another guest service order'
            });
        }

        res.status(200).json({
            success: true,
            serviceOrder: serviceOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Service Order
const updateServiceOrder = async (req, res) => {
    try {
       const { status } = req.body;
       const allowedStatuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
        success: false,
        message: 'Invalid service order status'
    });
}

        const serviceOrder = await ServiceOrder.findById(req.params.id);

        if (!serviceOrder) {
            return res.status(404).json({
                success: false,
                message: 'Service order not found'
            });
        }

    serviceOrder.status = status ?? serviceOrder.status;

        await serviceOrder.save();

        res.status(200).json({
            success: true,
            message: 'Service order updated successfully',
            serviceOrder: serviceOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Service Order
const deleteServiceOrder = async (req, res) => {
    try {
        const serviceOrder = await ServiceOrder.findById(req.params.id);

        if (!serviceOrder) {
            return res.status(404).json({
                success: false,
                message: 'Service order not found'
            });
        }

        await serviceOrder.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Service order deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createServiceOrder,
    getServiceOrders,
    getSingleServiceOrder,
    updateServiceOrder,
    deleteServiceOrder
};

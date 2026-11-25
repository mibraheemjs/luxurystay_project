const Service = require('../models/Service');

// Create New Service
const createService = async (req, res) => {

    try {

        const {
            serviceName,
            description,
            price,
            category
        } = req.body;

        const newService = new Service({
            serviceName,
            description,
            price,
            category
        });

        await newService.save();

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            service: newService
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Services
const getServices = async (req, res) => {

    try {

        const services = await Service.find();

        res.status(200).json({
            success: true,
            count: services.length,
            services: services
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Single Service
const getSingleService = async (req, res) => {

    try {

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            service: service
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Service
const updateService = async (req, res) => {

    try {

        const {
            serviceName,
            description,
            price,
            category,
            status
        } = req.body;

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        service.serviceName = serviceName ?? service.serviceName;
        service.description = description ?? service.description;
        service.price = price ?? service.price;
        service.category = category ?? service.category;
        service.status = status ?? service.status;

        await service.save();

        res.status(200).json({
            success: true,
            message: 'Service updated successfully',
            service: service
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Service
const deleteService = async (req, res) => {

    try {

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        await service.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createService,
    getServices,
    getSingleService,
    updateService,
    deleteService
};

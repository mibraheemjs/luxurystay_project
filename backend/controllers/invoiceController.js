
const Invoice = require('../models/Invoice');
const Booking = require('../models/Booking');
const ServiceOrder = require('../models/ServiceOrder');
const Payment = require('../models/Payment');
const PDFDocument = require('pdfkit');

const createInvoice = async (req, res) => {

    try {

        const { bookingId } = req.body;

        // Find booking with room details
        const booking = await Booking.findById(bookingId)
            .populate('room');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        if (booking.status !== 'Checked-Out') {
            return res.status(400).json({
                success: false,
                message: 'Invoice can only be generated for checked-out bookings'
            });
        }

        // Check if invoice already exists
        const existingInvoice = await Invoice.findOne({
            booking: bookingId
        });

        if (existingInvoice) {
            return res.status(400).json({
                success: false,
                message: 'Invoice already exists for this booking'
            });
        }

        // Calculate total nights
        const nights = Math.ceil(
            (booking.checkOut - booking.checkIn) /
            (1000 * 60 * 60 * 24)
        );

        // Calculate room charges
        const roomCharges = nights * booking.room.price;

        // Find completed service orders
        const orders = await ServiceOrder.find({
            booking: bookingId,
            status: 'Completed'
        }).populate('service');

        // Calculate service charges
        const serviceCharges = orders
            .filter(order => order.service)
            .map(order => ({
                serviceName: order.service.serviceName,
                quantity: order.quantity,
                unitPrice: order.totalPrice / order.quantity,
                totalPrice: order.totalPrice
            }));

        const totalServiceCharges = serviceCharges.reduce(
            (total, service) => total + service.totalPrice,
            0
        );

        // Calculate final bill
        const subtotal = roomCharges + totalServiceCharges;

        // Generate invoice number
        const invoiceNumber = 'INV-' + Date.now();

        // Create invoice
        const invoice = await Invoice.create({
            booking: bookingId,
            guest: booking.guest,
            invoiceNumber,
            nights,
            roomCharges,
            serviceCharges,
            subtotal,
            totalAmount: subtotal
        });

        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            invoice
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getInvoiceById = async (req, res) => {

    try {

        const invoice = await Invoice.findById(req.params.id)
            .populate('guest', 'name email')
            .populate({
                path: 'booking',
                select: 'checkIn checkOut status guestDetails room',
                populate: {
                    path: 'room',
                    select: 'roomNumber roomType price'
                }
            });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }
        // Find all paid payments for this invoice
        const payments = await Payment.find({
            invoice: invoice._id,
            paymentStatus: 'Paid'
        });

        // Calculate total paid amount
        const totalPaid = payments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        // Calculate remaining balance
        const remainingBalance = Math.max(
            0,
            invoice.totalAmount - totalPaid
        );

        res.status(200).json({
            success: true,
            message: 'Invoice fetched successfully',
            invoice,
            totalPaid,
            remainingBalance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const generateInvoicePDF = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('guest', 'name email')
            .populate({
                path: 'booking',
                populate: {
                    path: 'room',
                    select: 'roomNumber roomType price'
                }
            });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }
        // Find all paid payments for this invoice
        const payments = await Payment.find({
            invoice: invoice._id,
            paymentStatus: 'Paid'
        });

        // Calculate total paid amount
        const totalPaid = payments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        // Calculate remaining balance
        const remainingBalance = Math.max(
            0,
            invoice.totalAmount - totalPaid
        );

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=${invoice.invoiceNumber}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(22).text('LuxuryStay Hotel', { align: 'center' });
        doc.moveDown();

        doc.fontSize(16).text('INVOICE');
        doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
        doc.text(`Guest Name: ${invoice.booking.guestDetails.name}`);
        doc.text(`Email: ${invoice.guest.email}`);
        doc.text(`Room Number: ${invoice.booking.room.roomNumber}`);
        doc.text(`Room Type: ${invoice.booking.room.roomType}`);
        doc.text(`Nights: ${invoice.nights}`);

        doc.moveDown();
        doc.text(`Room Charges: Rs. ${invoice.roomCharges}`);

        doc.text('Additional Services:');

        invoice.serviceCharges.forEach(service => {
            doc.text(
                `${service.serviceName} x ${service.quantity}: Rs. ${service.totalPrice}`
            );
        });

        doc.moveDown();
        doc.fontSize(14).text(`Total Amount: Rs. ${invoice.totalAmount}`);
        doc.text(`Amount Paid: Rs. ${totalPaid}`);
        doc.text(`Remaining Balance: Rs. ${remainingBalance}`);

        doc.end();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createInvoice,
    getInvoiceById,
    generateInvoicePDF
};
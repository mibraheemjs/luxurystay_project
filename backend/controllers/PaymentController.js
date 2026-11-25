const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const Invoice = require('../models/Invoice');
// Create New Payment
// Create New Payment
const createPayment = async (req, res) => {
    try {
        const {
            invoiceId,
            amount,
            paymentMethod,
            transactionId
        } = req.body;

        if (!invoiceId || amount === undefined || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Invoice, amount and payment method are required'
            });
        }

        if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Payment amount must be greater than zero'
            });
        }

        const invoice = await Invoice.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }

        const bookingData = await Booking.findById(invoice.booking);

        if (!bookingData) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (
            req.user.role === 'guest' &&
            bookingData.guest.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: 'You cannot pay for another guest booking'
            });
        }

        const paidPayments = await Payment.find({
            invoice: invoiceId,
            paymentStatus: 'Paid'
        });

        const totalPaid = paidPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        const remainingBalance = invoice.totalAmount - totalPaid;

        if (Number(amount) > remainingBalance) {
            return res.status(400).json({
                success: false,
                message: 'Payment amount exceeds remaining balance'
            });
        }

        const newPayment = new Payment({
            invoice: invoiceId,
            booking: invoice.booking,
            amount: Number(amount),
            remainingBalance,
            paymentMethod,
            transactionId
        });

        await newPayment.save();

        res.status(201).json({
            success: true,
            message: 'Payment created successfully',
            payment: newPayment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Get All Payments
const getPayments = async (req, res) => {

    try {

        let payments;

        if (req.user.role === 'guest') {

            const bookings = await Booking.find({
                guest: req.user.id
            }).select('_id');

            const bookingIds = bookings.map(item => item._id);

            payments = await Payment.find({
                booking: { $in: bookingIds }
            }).populate('booking');

        } else {

            payments = await Payment.find().populate('booking');

        }

        res.status(200).json({
            success: true,
            count: payments.length,
            payments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Single Payment
const getSinglePayment = async (req, res) => {

    try {

        const payment = await Payment.findById(req.params.id)
            .populate('booking');

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        if (
            req.user.role === 'guest' &&
            payment.booking.guest.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.status(200).json({
            success: true,
            payment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Payment
// Update Payment
const updatePayment = async (req, res) => {
    try {
        const { paymentStatus } = req.body;

        const allowedStatuses = [
            'Pending',
            'Paid',
            'Failed',
            'Refunded'
        ];

        if (!allowedStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment status'
            });
        }

        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        payment.paymentStatus = paymentStatus;

        if (paymentStatus === 'Paid' && !payment.paymentDate) {
            payment.paymentDate = new Date();
        }

        await payment.save();

        const invoice = await Invoice.findById(payment.invoice);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }

        const paidPayments = await Payment.find({
            invoice: payment.invoice,
            paymentStatus: 'Paid'
        });

        const totalPaid = paidPayments.reduce(
            (total, item) => total + item.amount,
            0
        );

        const remainingBalance = Math.max(
            0,
            invoice.totalAmount - totalPaid
        );

        payment.remainingBalance = remainingBalance;
        await payment.save();

        res.status(200).json({
            success: true,
            message: 'Payment updated successfully',
            totalAmount: invoice.totalAmount,
            totalPaid,
            remainingBalance,
            payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Delete Payment
const deletePayment = async (req, res) => {

    try {

        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        await payment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Payment deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createPayment,
    getPayments,
    getSinglePayment,
    updatePayment,
    deletePayment
};
const sendEmail = require('../services/emailService');
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Test Email
const sendTestEmail = async (req, res) => {
    try {
        const email = req.user.email;

        const result = await sendEmail(
            email,
            'LuxuryStay - Test Email',
            `
                <h1>Welcome to LuxuryStay!</h1>
                <p>This is a test email from our hotel management system.</p>
                <p>Email service is working successfully.</p>
            `
        );

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Email could not be sent',
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Test email sent successfully',
            email: email
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Send Booking Confirmation Email
const sendBookingConfirmationEmail = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        const room = await Room.findById(booking.room);

        // Use test email if provided, otherwise guest email
        const email = req.body.email || booking.guestDetails.email;

        const emailHTML = `
            <h1>Booking Confirmed!</h1>

            <p>Dear ${booking.guestDetails.name},</p>

            <p>Your booking at LuxuryStay has been confirmed.</p>

            <h3>Booking Details</h3>

            <p><strong>Booking ID:</strong> ${booking._id}</p>

            <p><strong>Room:</strong> ${room ? room.roomNumber : 'N/A'}</p>

            <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>

            <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>

            <p><strong>Total Price:</strong> Rs. ${booking.totalPrice}</p>

            <p>Thank you for choosing LuxuryStay!</p>
        `;

        const result = await sendEmail(
            email,
            'LuxuryStay - Booking Confirmation',
            emailHTML
        );

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Email could not be sent',
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking confirmation email sent successfully',
            email: email
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    sendTestEmail,
    sendBookingConfirmationEmail
};
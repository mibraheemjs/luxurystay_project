const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Notification = require('../models/Notification');
const sendEmail = require('../services/emailService');
// Create New Booking

const createBooking = async (req, res) => {

    try {

        const {
            room,
            checkIn,
            checkOut,
            guestDetails
        } = req.body;

        const guest = req.user.id;

        // Guest Details Validation
        const requiredFields = [
            'name',
            'email',
            'nationality',
            'phoneNumber',
            'address',
            'idType',
            'idNumber'
        ];

        for (const field of requiredFields) {
            if (!guestDetails || !guestDetails[field]) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required`
                });
            }
        }

        // Find Room
        const selectedRoom = await Room.findById(room);

        if (!selectedRoom) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Room Status Check
        if (selectedRoom.status !== 'Available') {
            return res.status(400).json({
                success: false,
                message: 'Room is not available'
            });
        }

        // Date Validation
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (
            isNaN(checkInDate.getTime()) ||
            isNaN(checkOutDate.getTime()) ||
            checkOutDate <= checkInDate
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid check-in and check-out dates'
            });
        }

        // Total Price
        const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

        const totalPrice = nights * selectedRoom.price;

        // Save Booking
        const newBooking = new Booking({
            guest,
            room,
            guestDetails,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            totalPrice
        });

        await newBooking.save();


        // Create Booking Notification
try {
    await Notification.create({
        user: guest,
        title: 'Booking Created',
        message: `Your booking has been created successfully. Total amount: Rs. ${totalPrice}`,
        type: 'Booking'
    });
} catch (notificationError) {
    console.error(
        'Booking notification error:',
        notificationError.message
    );
}

// Send Booking Confirmation Email
try {
    const emailHTML = `
        <h1>Booking Confirmed!</h1>

        <p>Dear ${guestDetails.name},</p>

        <p>Your booking at LuxuryStay has been created successfully.</p>

        <h3>Booking Details</h3>

        <p><strong>Booking ID:</strong> ${newBooking._id}</p>

        <p><strong>Room:</strong> ${selectedRoom._id}</p>

        <p><strong>Check-in:</strong> ${checkInDate.toLocaleDateString()}</p>

        <p><strong>Check-out:</strong> ${checkOutDate.toLocaleDateString()}</p>

        <p><strong>Total Price:</strong> Rs. ${totalPrice}</p>

        <p>Thank you for choosing LuxuryStay!</p>
    `;

    const emailResult = await sendEmail(
        guestDetails.email,
        'LuxuryStay - Booking Confirmation',
        emailHTML
    );

    if (!emailResult.success) {
        console.log('Booking email failed:', emailResult.error);
    }

} catch (emailError) {
    console.error('Booking email error:', emailError.message);
}
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: newBooking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get All Bookings
const getBookings = async (req, res) => {

    try {

        const bookings = await Booking.find();

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings: bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Single Booking
const getSingleBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

         if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        if (
            req.user.role === 'guest' &&
            booking.guest.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: 'You are not allowed to view this booking'
            });
        }
       
        res.status(200).json({
            success: true,
            booking: booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Booking
const updateBooking = async (req, res) => {

    try {
        const { status } = req.body;

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        booking.status = status;

        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            booking: booking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

// Delete Booking
const deleteBooking = async (req, res) => {

    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        await booking.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    };

};

module.exports = {
    createBooking,
    getBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking
};

const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Payment = require('../models/Payment');
const Review = require('../models/Review');

const getDashboardReport = async (req, res) => {
    try {

        const [
            totalBookings,
            pendingBookings,
            confirmedBookings,
            checkedInBookings,
            checkedOutBookings,
            cancelledBookings,
            totalRooms,
            occupiedRooms,
            availableRooms,
            cleaningRooms,
            maintenanceRooms,
            revenueResult,
            pendingPaymentResult,
            reviewResult
        ] = await Promise.all([

            Booking.countDocuments(),
            Booking.countDocuments({ status: 'Pending' }),
            Booking.countDocuments({ status: 'Confirmed' }),
            Booking.countDocuments({ status: 'Checked-In' }),
            Booking.countDocuments({ status: 'Checked-Out' }),
            Booking.countDocuments({ status: 'Cancelled' }),

            Room.countDocuments(),
            Room.countDocuments({ status: 'Occupied' }),
            Room.countDocuments({ status: 'Available' }),
            Room.countDocuments({ status: 'Cleaning' }),
            Room.countDocuments({ status: 'Maintenance' }),

            Payment.aggregate([
                { $match: { paymentStatus: 'Paid' } },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$amount' }
                    }
                }
            ]),

            Payment.aggregate([
                { $match: { paymentStatus: 'Pending' } },
                {
                    $group: {
                        _id: null,
                        totalPending: { $sum: '$amount' }
                    }
                }
            ]),

            Review.aggregate([
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: '$rating' },
                        totalReviews: { $sum: 1 }
                    }
                }
            ])

        ]);

        const occupancyPercentage = totalRooms > 0
            ? Number(((occupiedRooms / totalRooms) * 100).toFixed(2))
            : 0;

        const report = {
            bookings: {
                total: totalBookings,
                pending: pendingBookings,
                confirmed: confirmedBookings,
                checkedIn: checkedInBookings,
                checkedOut: checkedOutBookings,
                cancelled: cancelledBookings
            },

            rooms: {
                total: totalRooms,
                occupied: occupiedRooms,
                available: availableRooms,
                cleaning: cleaningRooms,
                maintenance: maintenanceRooms,
                occupancyPercentage
            },

            revenue: {
                totalReceived: revenueResult[0]?.totalRevenue || 0
            },

            payments: {
                pendingAmount: pendingPaymentResult[0]?.totalPending || 0
            },

            reviews: {
                averageRating: Number(
                    (reviewResult[0]?.averageRating || 0).toFixed(2)
                ),
                totalReviews: reviewResult[0]?.totalReviews || 0
            }
        };

        res.status(200).json({
            success: true,
            message: 'Dashboard report fetched successfully',
            report
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Error generating dashboard report',
            error: error.message
        });

    }
};



const getMonthlyReport = async (req, res) => {
    try {
        const year = Number(req.query.year) || new Date().getFullYear();

        if (!Number.isInteger(year) || year < 2000 || year > 2100) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid year'
            });
        }

        const startDate = new Date(Date.UTC(year, 0, 1));
        const endDate = new Date(Date.UTC(year + 1, 0, 1));

        const [bookingData, revenueData] = await Promise.all([

            Booking.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $month: {
                                date: '$createdAt',
                                timezone: 'Asia/Karachi'
                            }
                        },
                        totalBookings: { $sum: 1 }
                    }
                }
            ]),

            Payment.aggregate([
                {
                    $match: {
                        paymentStatus: 'Paid'
                    }
                },
                {
                    $addFields: {
                        reportDate: {
                            $ifNull: ['$paymentDate', '$createdAt']
                        }
                    }
                },
                {
                    $match: {
                        reportDate: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $month: {
                                date: '$reportDate',
                                timezone: 'Asia/Karachi'
                            }
                        },
                        totalRevenue: { $sum: '$amount' }
                    }
                }
            ])

        ]);

        const monthNames = [
            'January', 'February', 'March',
            'April', 'May', 'June',
            'July', 'August', 'September',
            'October', 'November', 'December'
        ];

        const monthlyReport = monthNames.map((month, index) => {

            const monthNumber = index + 1;

            const booking = bookingData.find(
                item => item._id === monthNumber
            );

            const revenue = revenueData.find(
                item => item._id === monthNumber
            );

            return {
                month,
                totalBookings: booking?.totalBookings || 0,
                totalRevenue: revenue?.totalRevenue || 0
            };
        });

        res.status(200).json({
            success: true,
            message: 'Monthly report fetched successfully',
            year,
            monthlyReport
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating monthly report',
            error: error.message
        });
    }
};

const getRoomTypeAnalytics = async (req, res) => {
    try {

        const roomTypes = ['Single', 'Double', 'Deluxe', 'Suite'];

        const roomData = await Room.aggregate([
            {
                $group: {
                    _id: '$roomType',

                    totalRooms: { $sum: 1 },

                    averagePrice: { $avg: '$price' },

                    available: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'Available'] }, 1, 0]
                        }
                    },

                    occupied: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'Occupied'] }, 1, 0]
                        }
                    },

                    cleaning: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'Cleaning'] }, 1, 0]
                        }
                    },

                    maintenance: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'Maintenance'] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        const analytics = roomTypes.map(type => {

            const room = roomData.find(item => item._id === type);

            return {
                roomType: type,
                totalRooms: room?.totalRooms || 0,
                averagePrice: Number((room?.averagePrice || 0).toFixed(2)),
                available: room?.available || 0,
                occupied: room?.occupied || 0,
                cleaning: room?.cleaning || 0,
                maintenance: room?.maintenance || 0
            };
        });

        res.status(200).json({
            success: true,
            message: 'Room type analytics fetched successfully',
            analytics
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Error generating room type analytics',
            error: error.message
        });

    }
};


const getFeedbackAnalytics = async (req, res) => {
    try {

        const [ratingData, reviewData] = await Promise.all([

            Review.aggregate([
                {
                    $group: {
                        _id: '$rating',
                        totalReviews: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: -1 }
                }
            ]),

            Review.find()
                .populate('guest', 'name email')
                .populate('booking', 'checkIn checkOut')
                .sort({ createdAt: -1 })

        ]);

        const totalReviews = await Review.countDocuments();

        const averageRating = await Review.aggregate([
            {
                $group: {
                    _id: null,
                    average: { $avg: '$rating' }
                }
            }
        ]);

        const ratingSummary = [5, 4, 3, 2, 1].map(rating => {

            const found = ratingData.find(
                item => item._id === rating
            );

            return {
                rating,
                totalReviews: found?.totalReviews || 0
            };
        });

        res.status(200).json({
            success: true,
            message: 'Feedback analytics fetched successfully',

            analytics: {
                totalReviews,

                averageRating: Number(
                    (averageRating[0]?.average || 0).toFixed(2)
                ),

                ratingSummary,

                feedback: reviewData
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Error generating feedback analytics',
            error: error.message
        });

    }
};

module.exports = {
    getDashboardReport,
    getMonthlyReport,
    getRoomTypeAnalytics,
    getFeedbackAnalytics
};

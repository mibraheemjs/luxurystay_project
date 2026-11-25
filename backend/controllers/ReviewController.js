
const Review = require('../models/Review');
const Booking = require('../models/Booking');

// Create New Review
const createReview = async (req, res) => {
    try {
        const { booking, rating, comment } = req.body;

        if (!booking || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Please provide booking, rating and comment'
            });
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

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
                message: 'You can only review your own booking'
            });
        }

        if (selectedBooking.status !== 'Checked-Out') {
            return res.status(400).json({
                success: false,
                message: 'Review can only be submitted after checkout'
            });
        }

        const existingReview = await Review.findOne({
            guest: req.user.id,
            booking
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'Review already submitted'
            });
        }

        const newReview = await Review.create({
            guest: req.user.id,
            booking,
            rating,
            comment
        });

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            review: newReview
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Reviews
const getReviews = async (req, res) => {
    try {
        const filter = req.user.role === 'guest'
            ? { guest: req.user.id }
            : {};

        const reviews = await Review.find(filter)
            .populate('guest', '-password')
            .populate('booking');

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Get Single Review
const getSingleReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('guest', '-password')
            .populate('booking');

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Review
const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check review ownership
        if (review.guest.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You can only update your own review'
            });
        }

        if (rating !== undefined) {
            if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be between 1 and 5'
                });
            }

            review.rating = rating;
        }

        if (comment !== undefined) {
            review.comment = comment;
        }

        await review.save();

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        await review.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createReview,
    getReviews,
    getSingleReview,
    updateReview,
    deleteReview
};

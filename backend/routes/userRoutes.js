const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const roleMiddleware = require('../middleware/roleMiddleware');

const {
    getUsers,
    createUser,
    loginUser
} = require('../controllers/UserController');

// Get All Users
router.get('/', authMiddleware, roleMiddleware('admin'), getUsers);

// profile route
router.get('/profile', authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: 'Profile accessed successfully',
        user: req.user
    });

});

// Admin Only Route
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {

    res.status(200).json({
        success: true,
        message: 'Welcome Admin! You have access.'
    });

});

// Create New User
router.post('/', createUser);

// Login User
router.post('/login', loginUser);

module.exports = router;
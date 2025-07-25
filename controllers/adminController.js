const User = require('../models/User');

// @desc    Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        // Find all users and exclude their password field from the result
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
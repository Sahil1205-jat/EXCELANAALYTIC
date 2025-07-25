

const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); 
const authorize = require('../middleware/adminMiddleware');


router.get('/users', protect, authorize('admin'), (req, res) => {
    
    res.json({ message: 'List of all users (admin view)' });
});


router.delete('/user/:id', protect, authorize('admin'), (req, res) => {
  
    res.json({ message: `User ${req.params.id} deleted (admin action)` });
});

module.exports = router;
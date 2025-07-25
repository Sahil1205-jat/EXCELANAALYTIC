const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log('--- Auth Middleware Triggered ---');
    console.log('Authorization Header:', req.header('Authorization'));

    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        console.log('Error: No token found.');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // --- Add these console logs for debugging ---
    console.log('Token received by backend:', token);
    console.log('JWT_SECRET used by backend:', process.env.JWT_SECRET);
    // ------------------------------------------

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Token successfully verified.');
        next();
    } catch (e) {
        console.error('Token verification failed:', e.message);
        res.status(400).json({ msg: 'Token is not valid' });
    }
};
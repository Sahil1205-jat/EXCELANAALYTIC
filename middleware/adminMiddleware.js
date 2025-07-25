const authorize = (role) => {
    return (req, res, next) => {
        // Assumes your 'protect' middleware adds a 'user' object to the request.
        if (req.user && req.user.role === role) {
            next(); // User has the required role, proceed.
        } else {
            // User does not have the required role.
            res.status(403).json({ message: 'Forbidden: Access is denied.' });
        }
    };
};

module.exports = authorize;
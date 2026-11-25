const roleMiddleware = (allowedRole) => {

    return (req, res, next) => {

        if (req.user.role !== allowedRole) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You do not have permission'
            });
        }

        next();
    };

};

module.exports = roleMiddleware;
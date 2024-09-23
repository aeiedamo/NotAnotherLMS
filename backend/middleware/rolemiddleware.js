function roleMiddleware(requiredRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!requiredRoles.includes(userRole))
            return res.status(403).json({ message: "Access Denied. You don't have permissions" });

        next();
    };
}

module.exports = roleMiddleware;

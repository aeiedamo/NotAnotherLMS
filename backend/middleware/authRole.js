const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "No token provided" });
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Failed to authenticate token" });

    req.user = await User.findByPk(decoded.id);
    if (!req.user) return res.status(404).json({ message: "User not found" });
    next();
  });
};

const roleAuthorization = (requiredRoles) => {
  return (req, res, next) => {
    if (!requiredRoles.includes(req.user.role))
      return res
        .status(403)
        .json({ message: "Access forbidden: You don't have permissions" });
    next();
  };
};

module.exports = { verifyToken, roleAuthorization };

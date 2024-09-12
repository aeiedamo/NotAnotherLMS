const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { verifyToken, roleAuthorization } = require('../middleware/authRole');
const router = express.Router();

router.post("/register", verifyToken, roleAuthorization(['admin']), registerUser);
router.post("/login", loginUser);

module.exports = router;

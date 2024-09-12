const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    try {
        const { gmail, telegram, role } = req.body;
        const existingUser = await User.findOne({ where: { gmail } });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const user = await User.create({ gmail, telegram, role,
            passwordHash: 'oauth-only'
        });
        return res.status(201).json({ message: 'User reigstered successfully', user });
    }
    catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }
};

const loginUser = async (req, res) => {
    try {
        const { gmail } = req.body;
        const user = await User.findOne({ where: { gmail } });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, gmail: user.gmail, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Successfully Logged-in', token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { registerUser, loginUser };

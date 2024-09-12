const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define('User',
    {
        gmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        telegram: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM('student', 'instructor', 'admin'),
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
    }
);

module.exports = User;

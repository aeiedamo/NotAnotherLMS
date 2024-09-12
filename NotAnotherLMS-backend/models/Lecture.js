const { DataType, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');

const Lecture = sequelize.define('Lecture', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    videoURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructorID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
},
    {
        timestamps: true,
    }
);

module.exports = Lecture;

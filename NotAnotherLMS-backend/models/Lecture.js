const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Lecture = sequelize.define('Lecture', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    courseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Lecture;

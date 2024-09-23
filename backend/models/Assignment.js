const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');


const Assignment = sequelize.define(
  "Assignment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    courseID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Assignment;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    oauthProvider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telegram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("student", "instructor", "admin"),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;

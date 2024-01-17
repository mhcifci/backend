const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define(
  "admins",
  {
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "admins" }
);

module.exports = Admin;

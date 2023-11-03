const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "users",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country_code: {
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
    is_active: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: true, underscored: true, tableName: "users" }
);

module.exports = User;

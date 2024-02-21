const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserTypes = sequelize.define(
  "user_types",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    show_menus: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_types" }
);

module.exports = UserTypes;

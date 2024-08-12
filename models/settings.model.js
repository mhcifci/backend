const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Settings = sequelize.define(
  "settings",
  {
    sales_logo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, underscored: false, tableName: "settings" }
);

module.exports = Settings;

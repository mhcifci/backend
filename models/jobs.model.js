const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Jobs = sequelize.define(
  "jobs",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      max: 1000,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 55,
    },
    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: false,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    show_fee: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true, underscored: true, tableName: "jobs" }
);

module.exports = Jobs;

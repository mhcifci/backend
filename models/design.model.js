const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Design = sequelize.define(
  "design",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
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
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_deleted: {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: false,
    },
    max_apply: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    show_fee: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true, underscored: true, tableName: "design" }
);

module.exports = Design;

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Listings = sequelize.define(
  "listings",
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
      allowNull: false,
      max: 1000,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 55,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
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
  { timestamps: true, underscored: true, tableName: "listings" }
);

module.exports = Listings;

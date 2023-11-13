const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const ListingCategories = sequelize.define(
  "listings_categories",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      max: 500,
    },
  },
  { timestamps: true, underscored: true, tableName: "listings_categories" }
);

module.exports = ListingCategories;

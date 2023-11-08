const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const ListingIncludeFiles = sequelize.define(
  "listings_include_files",
  {
    listing_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 255,
    },
  },
  { timestamps: true, underscored: true, tableName: "listings_include_files" }
);

module.exports = ListingIncludeFiles;

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const ListingIncludeFiles = sequelize.define(
  "listings_include_files",
  {
    listing_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    file_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "listings_include_files" }
);

module.exports = ListingIncludeFiles;

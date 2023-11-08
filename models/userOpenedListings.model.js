const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserOpenedListings = sequelize.define(
  "user_opened_listings",
  {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    transaction_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    listing_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_opened_listings" }
);

module.exports = UserOpenedListings;

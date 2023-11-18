const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserFollowListings = sequelize.define(
  "user_follow_listings",
  {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    listing_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_following: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_follow_listings" }
);

module.exports = UserFollowListings;

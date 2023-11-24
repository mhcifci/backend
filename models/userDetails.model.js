const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserDetails = sequelize.define(
  "user_details",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    img_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    preffered_post_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preffered_max_mile: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false, underscored: true, tableName: "user_details" }
);

module.exports = UserDetails;

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
      allowNull: true,
    },
    preffered_post_code: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    preffered_max_mile: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    type_of_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    company_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: false, underscored: true, tableName: "user_details" }
);

module.exports = UserDetails;

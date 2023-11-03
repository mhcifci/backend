const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserFcmTokens = sequelize.define(
  "user_fcm_tokens",
  {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_fcm_tokens" }
);

module.exports = UserFcmTokens;

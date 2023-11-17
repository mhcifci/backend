const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserLostPasswords = sequelize.define(
  "user_lost_passwords",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_lost_passwords" }
);

module.exports = UserLostPasswords;

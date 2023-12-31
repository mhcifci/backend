const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserTransactions = sequelize.define(
  "user_transactions",
  {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reason: {
      type: Sequelize.TEXT,
      allowNull: true,
      max: 500,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_transactions" }
);

module.exports = UserTransactions;

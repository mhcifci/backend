const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Orders = sequelize.define(
  "orders",
  {
    order_key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    package_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("PENDING", "COMPLETED", "CANCELLED"),
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "orders" }
);

module.exports = Orders;

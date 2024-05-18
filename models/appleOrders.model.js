const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const AppleOrders = sequelize.define(
  "apple_orders",
  {
    order_key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("PENDING", "COMPLETED", "CANCELLED"),
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "apple_orders" }
);

module.exports = AppleOrders;

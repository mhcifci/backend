const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const SalesOrderDetails = sequelize.define(
  "sales_order_details",
  {
    sales_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },
  { timestamps: true, underscored: true, tableName: "sales_order_details" }
);

module.exports = SalesOrderDetails;

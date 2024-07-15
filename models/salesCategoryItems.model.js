const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const SalesCategoryItems = sequelize.define(
  "sales_category_items",
  {
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  },
  { timestamps: true, underscored: true, tableName: "sales_category_items" }
);

module.exports = SalesCategoryItems;

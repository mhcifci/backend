const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const SalesCategories = sequelize.define(
  "sales_categories",
  {
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
  { timestamps: true, underscored: true, tableName: "sales_categories" }
);

module.exports = SalesCategories;

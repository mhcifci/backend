const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const DesignCategories = sequelize.define(
  "design_categories",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      max: 500,
    },
  },
  { timestamps: true, underscored: true, tableName: "design_categories" }
);

module.exports = DesignCategories;

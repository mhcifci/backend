const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const AppleProducts = sequelize.define(
  "apple_products",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    product_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    product_description: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    product_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "apple_products",
  }
);

module.exports = AppleProducts;

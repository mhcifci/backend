const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Packages = sequelize.define(
  "packages",
  {
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      max: 500,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  },
  { timestamps: true, underscored: true, tableName: "packages" }
);

module.exports = Packages;

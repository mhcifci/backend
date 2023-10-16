const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Companies = sequelize.define(
  "companies",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company_phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "companies" }
);

module.exports = Companies;

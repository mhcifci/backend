const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Sales = sequelize.define(
  "sales",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    additional_notes : {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    is_active : {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { timestamps: true, underscored: true, tableName: "sales" }
);

module.exports = Sales;

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const DesignDraft = sequelize.define(
  "design_draft",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      max: 1000,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 55,
    },
    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "design_draft" }
);

module.exports = DesignDraft;

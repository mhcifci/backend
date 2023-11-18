const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const JobsCategories = sequelize.define(
  "jobs_categories",
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
  { timestamps: true, underscored: true, tableName: "jobs_categories" }
);

module.exports = JobsCategories;

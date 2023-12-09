const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const JobQualificationCategories = sequelize.define(
  "job_qualification_categories",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      maxValue: 105,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      maxValue: 500,
    },
  },
  { timestamps: true, underscored: true, tableName: "job_qualification_categories" }
);

module.exports = JobQualificationCategories;

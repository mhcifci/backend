const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const JobQualifications = sequelize.define(
  "job_qualifications",
  {
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      maxValue: 255,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      maxValue: 500,
    },
  },
  { timestamps: true, underscored: true, tableName: "job_qualifications" }
);

module.exports = JobQualifications;

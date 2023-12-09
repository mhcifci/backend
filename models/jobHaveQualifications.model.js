const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const JobHaveQualifications = sequelize.define(
  "jobs_have_qualifications",
  {
    job_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    qualification_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "jobs_have_qualifications" }
);

module.exports = JobHaveQualifications;

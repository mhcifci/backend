const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserOpenedJobs = sequelize.define(
  "user_opened_jobs",
  {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    transaction_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    job_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_opened_jobs" }
);

module.exports = UserOpenedJobs;

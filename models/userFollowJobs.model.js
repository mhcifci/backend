const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserFollowJobs = sequelize.define(
  "user_follow_jobs",
  {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    job_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_following: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_follow_jobs" }
);

module.exports = UserFollowJobs;

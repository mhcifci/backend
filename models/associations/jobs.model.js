const UserFollowJobs = require("../userFollowJobs.model");
const Jobs = require("../jobs.model");
const User = require("../user.model");

Jobs.hasMany(UserFollowJobs, { foreignKey: "job_id" });
UserFollowJobs.belongsTo(Jobs, { foreignKey: "job_id" });

User.hasMany(Jobs, { foreignKey: "user_id" });
Jobs.belongsTo(User, { foreignKey: "user_id" });

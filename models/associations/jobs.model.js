const UserFollowJobs = require("../userFollowJobs.model");
const Jobs = require("../jobs.model");
const JobsCategories = require("../jobsCategories.model");

Jobs.hasMany(UserFollowJobs, { foreignKey: "job_id" });
UserFollowJobs.belongsTo(Jobs, { foreignKey: "job_id" });

Jobs.belongsTo(JobsCategories, { foreignKey: "category_id" });
JobsCategories.hasMany(Jobs, { foreignKey: "category_id" });

const JobHaveQualifications = require("../jobHaveQualifications.model");
const JobQualifications = require("../jobQualifications.model");
const User = require("../user.model");
const UserFollowJobs = require("../userFollowJobs.model");

User.hasMany(UserFollowJobs, { foreignKey: "user_id" });
UserFollowJobs.belongsTo(User, { foreignKey: "user_id" });

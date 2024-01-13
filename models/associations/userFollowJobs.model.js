const User = require("../user.model");
const UserFollowJobs = require("../userFollowJobs.model");

User.hasMany(UserFollowJobs, { foreignKey: "user_id" });
UserFollowJobs.belongsTo(User, { foreignKey: "user_id" });

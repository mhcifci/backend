const User = require("../user.model");
const UserFollowListings = require("../userFollowListings.model");

User.hasMany(UserFollowListings, { foreignKey: "user_id" });
UserFollowListings.belongsTo(User, { foreignKey: "user_id" });

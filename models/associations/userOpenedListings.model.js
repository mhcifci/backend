const User = require("../user.model");
const UserOpenedListings = require("../userOpenedListings.model");
const Listing = require("../listing.model");
const Jobs = require("../jobs.model");
const UserOpenedJobs = require("../userOpenedJobs.model");
const UserTransactions = require("../userTransactions.model");

User.hasMany(UserOpenedListings, { foreignKey: "user_id" });
UserOpenedListings.belongsTo(User, { foreignKey: "user_id" });

Listing.hasMany(UserOpenedListings, { foreignKey: "listing_id" });
UserOpenedListings.belongsTo(Listing, { foreignKey: "listing_id" });

User.hasMany(UserOpenedJobs, { foreignKey: "user_id" });
UserOpenedJobs.belongsTo(User, { foreignKey: "user_id" });

Jobs.hasMany(UserOpenedJobs, { foreignKey: "job_id" });
UserOpenedJobs.belongsTo(Jobs, { foreignKey: "job_id" });

UserTransactions.hasMany(UserOpenedJobs, { foreignKey: "transaction_id" });
UserOpenedJobs.belongsTo(UserTransactions, { foreignKey: "transaction_id" });

UserTransactions.hasMany(UserOpenedListings, { foreignKey: "transaction_id" });
UserOpenedListings.belongsTo(UserTransactions, { foreignKey: "transaction_id" });

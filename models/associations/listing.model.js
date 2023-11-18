const UserFollowListings = require("../userFollowListings.model");
const Listings = require("../listing.model");

Listings.hasMany(UserFollowListings, { foreignKey: "listing_id" });
UserFollowListings.belongsTo(Listings, { foreignKey: "listing_id" });

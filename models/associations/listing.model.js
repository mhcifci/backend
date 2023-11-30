const UserFollowListings = require("../userFollowListings.model");
const Listings = require("../listing.model");
const ListingCategories = require("../listingCategories.model");

Listings.hasMany(UserFollowListings, { foreignKey: "listing_id" });
UserFollowListings.belongsTo(Listings, { foreignKey: "listing_id" });

Listings.belongsTo(ListingCategories, { foreignKey: "category_id" });
ListingCategories.hasMany(Listings, { foreignKey: "category_id" });

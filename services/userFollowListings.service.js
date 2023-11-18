const BaseService = require("./base.service");
const userFollowListings = require("../models/userFollowListings.model");

class userFollowListingsService extends BaseService {
  constructor() {
    super(userFollowListings);
  }

  async getUserFollowListings(user_id) {
    const list = await this.getAll({
      where: {
        user_id,
      },
    });
    return list;
  }

  // Listing'i takip eder
  async doFollowListing(user_id, listing_id) {
    const item = await this.getWithCondition({
      user_id: parseInt(user_id),
      listing_id: parseInt(listing_id),
    });
    if (!item) {
      return await this.create({
        user_id: parseInt(user_id),
        listing_id: parseInt(listing_id),
        is_following: true,
      });
    }
    return await item.update({
      is_following: true,
    });
  }

  // Listing'i takipten çıkarır
  async deleteFollowListing(user_id, listing_id) {
    // find
    const item = await this.getWithCondition({
      user_id: parseInt(user_id),
      listing_id: parseInt(listing_id),
    });
    if (!item) throw new Error("You are not following this listing.");
    await this.delete(item.id);
    return true;
  }

  // mark not interested
  async notInterested(user_id, listing_id) {
    // find
    const item = await this.getWithCondition({
      user_id: parseInt(user_id),
      listing_id: parseInt(listing_id),
    });
    if (!item) {
      return await this.create({
        user_id: parseInt(user_id),
        listing_id: parseInt(listing_id),
        is_following: false,
      });
    }
    return await item.update({
      is_following: false,
    });
  }
}

module.exports = userFollowListingsService;

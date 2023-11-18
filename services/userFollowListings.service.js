const { Op } = require("sequelize");
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
}

module.exports = userFollowListingsService;

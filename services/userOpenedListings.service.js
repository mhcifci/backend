const BaseService = require("./base.service");
const UserOpenedListings = require("../models/userOpenedListings.model");

class UserOpenedListingsService extends BaseService {
  constructor() {
    super(UserOpenedListings);
  }
}

module.exports = UserOpenedListingsService;

const { Op } = require("sequelize");
const BaseService = require("./base.service");
const UserOpenedListings = require("../models/userOpenedListings.model");
const sequelize = require("../config/database");

class UserOpenedListingsService extends BaseService {
  constructor() {
    super(UserOpenedListings);
  }
}

module.exports = new UserOpenedListingsService();

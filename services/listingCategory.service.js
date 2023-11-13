const { Op } = require("sequelize");
const BaseService = require("./base.service");
const ListingCategories = require("../models/listingCategories.model");

class ListingCategoryService extends BaseService {
  constructor() {
    super(ListingCategories);
  }
}

module.exports = new ListingCategoryService();

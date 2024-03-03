const { Op } = require("sequelize");
const BaseService = require("./base.service");
const DesignCategories = require("../models/designCategories.model");

class DesignCategoriesService extends BaseService {
  constructor() {
    super(DesignCategories);
  }
}

module.exports = DesignCategoriesService;

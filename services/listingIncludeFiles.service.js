const { Op } = require("sequelize");
const BaseService = require("./base.service");
const ListingIncludeFiles = require("../models/listingIncludeFiles.model");

class ListingIncludeFilesService extends BaseService {
  constructor() {
    super(ListingIncludeFiles);
  }
}

module.exports = ListingIncludeFilesService;

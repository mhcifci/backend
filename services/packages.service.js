const BaseService = require("./base.service");
const Packages = require("../models/packages.model");

class PackagesService extends BaseService {
  constructor() {
    super(Packages);
  }
}

module.exports = PackagesService;

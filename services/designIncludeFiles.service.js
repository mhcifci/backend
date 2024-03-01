const BaseService = require("./base.service");
const DesignIncludeFiles = require("../models/designIncludeFiles.model");

class DesignIncludeFilesService extends BaseService {
  constructor() {
    super(DesignIncludeFiles);
  }
}

module.exports = DesignIncludeFilesService;

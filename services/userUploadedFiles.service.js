const { Op } = require("sequelize");
const BaseService = require("./base.service");
const userUploadedFiles = require("../models/userUploadedFiles.model");

class UserUploadedFilesService extends BaseService {
  constructor() {
    super(userUploadedFiles);
  }
}

module.exports = UserUploadedFilesService;

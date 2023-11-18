const { Op } = require("sequelize");
const BaseService = require("./base.service");
const userUploadedFiles = require("../models/userUploadedFiles.model");

class UserUploadedFilesService extends BaseService {
  constructor() {
    super(userUploadedFiles);
  }

  async getFileUrl(id) {
    const file = await this.getWithCondition({ id });
    if (!file) {
      throw new Error("Dosya bulunamadı.");
    }
    return process.env.BUNNY_DOMAIN + file.file_url;
  }
}

module.exports = UserUploadedFilesService;

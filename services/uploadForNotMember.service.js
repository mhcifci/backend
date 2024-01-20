const UserUploadedFiles = require("../models/userUploadedFiles.model");
const bunnyHelper = require("../utils/bunny.helper");
const BaseService = require("./base.service");

class UploadService extends BaseService {
  constructor() {
    super(UserUploadedFiles);
  }

  /**
   * Upload file to Bunny CDN and save to database.
   * @param {*} path File path
   * @param {*} file File
   * @param {*} user ID of the user
   * @param {*} comment Optional comment
   */
  async uploadFile(path, file, fileName, user, description) {
    try {
      // Dosya var mı yok mu bakalım
      if (!file) throw new Error("File is not defined.");
      if (!path) throw new Error("Path is not defined.");

      // Dosya Bunny CDN'e yüklenir

      // eğer path varsa ve "/" eşit değilse, path oluşturulur
      if (path && path !== "/") {
        const result = await bunnyHelper.createDirectory(path);
        if (result && result.HttpCode !== 201) throw new Error("Directory could not be created on CDN.");
      }
      // path "/" eşit değilse path ile beraber dosya adı gönderilir
      if (path && path !== "/") fileName = path + "/" + fileName;

      const result = await bunnyHelper.uploadFile(file, fileName);
      if (result && result.HttpCode !== 201) throw new Error("File could not be uploaded to CDN.");

      // Dosya veritabanına kaydedilir
      const data = {
        file_url: fileName,
        user_id: user ? user : null,
        description: description,
      };

      return await this.create(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UploadService;

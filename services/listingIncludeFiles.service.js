require("../models/associations/files.model");
const UserUploadedFiles = require("../models/userUploadedFiles.model");
const BaseService = require("./base.service");
const ListingIncludeFiles = require("../models/listingIncludeFiles.model");
// const UserUploadedFiles = require("./userUploadedFiles.service");

class ListingIncludeFilesService extends BaseService {
  constructor() {
    super(ListingIncludeFiles);
  }

  async getFileUrls(listingId) {
    const results = await this.model.findAll({
      where: {
        listing_id: listingId,
      },
      include: [
        {
          model: UserUploadedFiles,
        },
      ],
    });
    if (!results) {
      return [];
    }
    const fileUrls = [];
    await results.map((row) => {
      const fileData = row.dataValues.user_uploaded_file.dataValues;
      fileUrls.push({
        id: fileData.id,
        listing_id: row.dataValues.listing_id,
        url: process.env.BUNNY_DOMAIN + fileData.file_url,
      });
    });
    return fileUrls;
  }
}

module.exports = ListingIncludeFilesService;

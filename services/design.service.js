require("../models/associations/listing.model");

const BaseService = require("./base.service");
const user = require("./user.service");
const postCodes = require("./postCodes.service");

const { Op } = require("sequelize");
const Design = require("../models/design.model");
const DesignIncludeFiles = require("./designIncludeFiles.service");

// Start Class
const userService = new user();
const designIncludeFilesService = new DesignIncludeFiles();
const postCodesService = new postCodes();

class DesignService extends BaseService {
  constructor() {
    super(Design);
  }

  async createListing(user, data) {
    // Önce kullanıcıya bakılır
    if (!user) {
      throw new Error("User not found.");
    }
    const checkUser = await userService.getById(parseInt(user));
    if (!checkUser) {
      throw new Error("User not found.");
    }

    const findLatLang = await postCodesService.getLatLongFromPostcode(data.country);
    if (!findLatLang) {
      throw new Error("Country not found.");
    }

    const listingData = { ...data, user_id: user, country: findLatLang.postcode, latitude: findLatLang.latitude, longitude: findLatLang.longitude };

    const created = await this.create(listingData);

    // include_files array olarak geliyor ama boşta olabilir, her array için tek tek kayıt yapılacak.
    if (data.include_files) {
      if (data.include_files.length > 0) {
        for (let i = 0; i < data.include_files.length; i++) {
          await designIncludeFilesService.create({
            listing_id: created.id,
            file_id: data.include_files[i],
          });
        }
      }
    }
    return created;
  }
}

module.exports = DesignService;

require("../models/associations/listing.model");

const BaseService = require("./base.service");
const user = require("./user.service");
const postCodes = require("./postCodes.service");

const { Op } = require("sequelize");
const DesignDraft = require("../models/designDraft.model");
const DesignIncludeFiles = require("./designIncludeFiles.service");

// Start Class
const userService = new user();
const designIncludeFilesService = new DesignIncludeFiles();
const postCodesService = new postCodes();

class DesignDraftService extends BaseService {
  constructor() {
    super(DesignDraft);
  }

  async createListing(data) {
    const { email, phone } = data;

    const checkUser = await userService.getWithCondition({
      [Op.or]: [{ email: email }, { phone: phone }],
    });
    if (checkUser) {
      throw new Error("User already exists, please login and try again.");
    }

    const checkListing = await this.getWithCondition({
      [Op.or]: [{ email: email }, { phone: phone }],
    });

    if (checkListing) {
      throw new Error("Listing already exists, please login and try again.");
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

module.exports = DesignDraftService;

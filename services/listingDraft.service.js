require("../models/associations/listing.model");

const ListingDraft = require("../models/listingDraft.model");

const BaseService = require("./base.service");
const user = require("./user.service");
const listingIncludeFiles = require("./listingIncludeFiles.service");
const listingCategory = require("./listingCategories.service");
const postCodes = require("./postCodes.service");

const { Op } = require("sequelize");

// Start Class
const userService = new user();
const listingIncludeFilesService = new listingIncludeFiles();
const listingCategoryService = new listingCategory();
const postCodesService = new postCodes();

class ListingDraftService extends BaseService {
  constructor() {
    super(ListingDraft);
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

    // ListingCategoryService ile kategori kontrol edilir.
    const checkCategory = await listingCategoryService.getById(parseInt(data.category_id));
    if (!checkCategory) {
      throw new Error("Category not found.");
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
          await listingIncludeFilesService.create({
            listing_id: created.id,
            file_id: data.include_files[i],
          });
        }
      }
    }
    return created;
  }
}

module.exports = ListingDraftService;

const response = require("../interceptors/response.interceptor");
const ListingCategories = require("../services/listingCategories.service");
const Listing = require("../services/listing.service");
const UserFollowListings = require("../services/userFollowListings.service");
const ListingDraft = require("../services/listingDraft.service");
const { changeLostPassword } = require("./auth.controller");

// Start Class
const listingService = new Listing();
const listingCategoryService = new ListingCategories();
const userFollowListingsService = new UserFollowListings();
const listingDraftService = new ListingDraft();

exports.getAllPublic = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await listingService.getListingsbyPublic(page, limit, {
      is_active: true,
    });
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;
    const result = await listingService.getListingsbyUser(user.id, page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getFollowingListings = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;
    const result = await listingService.getFollowedListings(user.id, page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getNotInterestedListings = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;
    const result = await listingService.getNotInterestedListings(user.id, page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};
exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const result = await listingService.getListingDetail(user.id, id);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const user = req.user;

    const result = await listingService.createListing(user.id, {
      category_id: req.body.category_id,
      description: req.body.description,
      country: req.body.country,
      is_active: false,
      include_files: req.body.include_files,
    });
    return response.success(res, result, "Listing created successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.createforNotMember = async (req, res) => {
  try {
    const result = await listingDraftService.createListing({
      country: req.body.country,
      email: req.body.email,
      country_code: req.body.country_code,
      phone: req.body.phone,
      category_id: req.body.category_id,
      description: req.body.description,
      country: req.body.country,
      is_active: false,
      include_files: req.body.include_files,
    });
    return response.success(res, result, "Listing created successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};
exports.requestNew = async (req, res) => {
  try {
    const user = req.user;

    const result = await listingService.createListing(user.id, {
      category_id: req.body.category_id,
      description: req.body.description,
      country: req.body.country,
      is_active: false,
      include_files: req.body.include_files,
    });
    return response.success(res, result, "Listing created successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};
// All
exports.getListingCategories = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await listingCategoryService.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Single category information
exports.getListingCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await listingService.getById(parseInt(id));
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getListingsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, page = 1 } = req.query;
    const user = req.user;

    const result = await listingService.getListingsbyCategory(parseInt(page), parseInt(limit), parseInt(id), parseInt(user.id));
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.showInformation = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await listingService.viewInformation(user.id, id);
    return response.success(res, result, "Listing opened successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getListingCategory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await listingCategoryService.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Kullanıcının tercihlerine göre ilanları getirir.
exports.getListingsbyPreffered = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;
    const data = await listingService.getListingsByPreferences(user.id, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getListingByPostcodeAndRadius = async (req, res) => {
  try {
    const user = req.user;
    const { postcode, mile = 10, limit = 10, page = 1 } = req.query;
    const data = await listingService.getListingByPostcodeAndRadius(user.id, postcode, mile, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.searchListings = async (req, res) => {
  try {
    const user = req.user;
    const { keyword, limit = 10, page = 1 } = req.query;
    const data = await listingService.searchListing(user.id, keyword, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};
exports.searchListingsNew = async (req, res) => {
  try {
    const user = req.user;
    const { keyword, category, postcode, mile, limit = 10, page = 1 } = req.query;

    const data = await listingService.searchListingNew(user.id, keyword, category, postcode, mile, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.searchListingsbyCategory = async (req, res) => {
  try {
    const user = req.user;
    const { keyword, limit = 10, page = 1 } = req.query;
    const { category_id } = req.params;
    const data = await listingService.searchListingbyCategory(user.id, category_id, keyword, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.searchListingByPostcodeAndRadius = async (req, res) => {
  try {
    const user = req.user;
    const { keyword, postcode, mile = 10, limit = 10, page = 1 } = req.query;
    const data = await listingService.searchListingByPostcodeAndRadius(user.id, postcode, mile, keyword, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// İlanı takip eder.
exports.doFollow = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await userFollowListingsService.doFollowListing(user.id, id);
    return response.success(res, []);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// İlanı takipten çıkarır.
exports.deleteFollow = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await userFollowListingsService.deleteFollowListing(user.id, id);
    return response.success(res, []);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// İlgilenmiyor olarak işaretler.
exports.notInterested = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await userFollowListingsService.notInterested(user.id, id);
    return response.success(res, []);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

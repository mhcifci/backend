const response = require("../interceptors/response.interceptor");
const ListingCategories = require("../services/listingCategories.service");
const Listing = require("../services/listing.service");

// Start Class
const listingService = new Listing();
const listingCategoryService = new ListingCategories();

exports.getAll = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await listingService.getAllWithPagination(page, limit);
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
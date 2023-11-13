const response = require("../interceptors/response.interceptor");
const ListingCategories = require("../services/listingCategories.service");
const Listing = require("../services/listing.service");

exports.getAll = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await Listing.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const result = await Listing.getListingDetail(user.id, id);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    // Auth middleware'dan gelen user kontrol edilir.
    const user = req.user;

    const result = await Listing.createListing(user.id, {
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
    const result = await Listing.viewInformation(user.id, id);
    return response.success(res, result, "Listing opened successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getListingCategory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await ListingCategories.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

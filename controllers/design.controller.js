const response = require("../interceptors/response.interceptor");
const DesignDraft = require("../services/designDraft.service");
const DesignCategories = require("../services/designCategories.service");
const Design = require("../services/design.service");
const ListingCategories = require("../services/listingCategories.service");

// Start Class
const designDraftService = new DesignDraft();
const designService = new Design();
const listingCategoryService = new ListingCategories();

exports.create = async (req, res) => {
  try {
    const user = req.user;

    const result = await designService.createListing(user.id, {
      category_id: req.body.category_id,
      description: req.body.description,
      country: req.body.country,
      is_active: false,
      include_files: req.body.include_files,
    });
    return response.success(res, result, "Design request created successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.createforNotMember = async (req, res) => {
  try {
    const result = await designDraftService.createListing({
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
    return response.success(res, result, "Design request created successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getDesignCategories = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await listingCategoryService.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

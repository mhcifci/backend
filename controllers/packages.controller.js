const response = require("../interceptors/response.interceptor");
const AppleProductsService = require("../services/appleProducts.service");
const Packages = require("../services/packages.service");

// Start Class
const packagesService = new Packages();
const appleProductsService = new AppleProductsService();

exports.getAll = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await packagesService.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await packagesService.getById(id);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.getAllAppleProducts = async (req, res) => {
  try {
    const result = await appleProductsService.getAllWithPagination();
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

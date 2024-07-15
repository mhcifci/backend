const response = require("../interceptors/response.interceptor");
const SalesService = require("../services/sales.service");


// Start Class
const SalesServiceService = new SalesService();

// End Class

exports.getAllCategories = async (req, res) => {
  try {
    const result = await SalesServiceService.getAll();
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.getAllCategoriesWithItems = async (req, res) => {
  try {

    const result = await SalesServiceService.getAllCategoriesWithItems();
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
}

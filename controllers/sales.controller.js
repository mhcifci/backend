
const { DataException, AlreadyException } = require('./../exceptions/SaleExceptions');
const response = require("../interceptors/response.interceptor");
const SalesService = require("../services/sales.service");
const SettingService = require("../services/settings.service");


// Start Class
const SalesServiceService = new SalesService();
const SettingServiceService = new SettingService();

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



exports.getLogoFromSettings = async (req, res) => {
  try {
    const result = await SettingServiceService.getSalesLogo();
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
}



exports.createNewSalesOrder = async (req, res) => {
  try {

    const user = req.user;
    const { items_detail, additional_notes } = req.body;

    const result = await SalesServiceService.createSalesOrder(parseInt(user.id), items_detail, additional_notes);
    return response.success(res, result, "Sales created successfully");
  } catch (err) {
    if (err instanceof DataException) {
      console.log(err.message);
      return  res.status(200).json({
        status: 200,
        success: false,
        "message": err.message,
        data: null,
      });
    } else if (err instanceof AlreadyException) {
      console.log(err.message);
      return  res.status(200).json({
        status: 200,
        success: false,
        "message": err.message,
        data: null,
      });
    } else {

      return response.badRequest(res, "An unexpected error occurred");
    }
  }
}

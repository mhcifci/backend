const response = require("../../interceptors/response.interceptor");
const User = require("../../services/user.service");

const controllerBaseService = new User();

exports.getAll = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const data = await controllerBaseService.getAllWithPagination(page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await controllerBaseService.getById(parseInt(id));
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, surname, email, phone, is_active, startDate, endDate } = req.query;
    const result = await controllerBaseService.searchUsers(page, limit, name, surname, email, phone, is_active, startDate, endDate);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

const response = require("../interceptors/response.interceptor");
const companiesService = require("../services/companies.service");
const User = require("../services/user.service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    return response.success(res, users);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(parseInt(req.params.id));
    return response.success(res, user);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.createUser(req.body);
    if (req.body.is_company) {
      const company = await companiesService.createCompany({
        user_id: user.id,
        company_name: req.body.company_name,
        company_phone: req.body.company_phone,
      });
      return response.success(res, { user: user, company: company });
    }

    return response.success(res, user);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// TODO : Kontrol Edilecek.
exports.updateUser = async (req, res) => {
  try {
    const user = await User.updateUser(req.params.id, req.body);
    return response.success(res, user);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    return response.success(res, null, null);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

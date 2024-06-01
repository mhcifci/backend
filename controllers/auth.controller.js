const response = require("../interceptors/response.interceptor");
const Auth = require("../services/auth.service");
const User = require("../services/user.service");
const Companies = require("../services/companies.service");

// Start Class
const authService = new Auth();
const userService = new User();
const companiesService = new Companies();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({
      email,
      password,
    });
    if (result.user.is_active != true) {
      return response.forbidden(res, "Contact our customer services.");
    }
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return response.success(res, user);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.sendLostPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.sendLostPassword(email);
    return response.success(res, [], "Email sent.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.changeLostPassword = async (req, res) => {
  try {
    const { email, code, new_password, re_password } = req.body;
    await authService.changeLostPassword(code, email, new_password, re_password);
    return response.success(res, [], "Password changed.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = req.user;
    await userService.deleteAccount(user.id);
    return response.success(res, [], "Account Deleted.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

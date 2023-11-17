const response = require("../interceptors/response.interceptor");
const Auth = require("../services/auth.service");
const User = require("../services/user.service");

// Start Class
const authService = new Auth();
const userService = new User();

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

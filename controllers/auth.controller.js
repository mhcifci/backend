const response = require("../interceptors/response.interceptor");
const Auth = require("../services/auth.service");

// Start Class
const authService = new Auth();
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

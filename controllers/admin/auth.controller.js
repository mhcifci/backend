const response = require("../../interceptors/response.interceptor");
const Admin = require("../../services/admin.service");

// Start Class
const adminService = new Admin();

exports.authAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await adminService.authAdmin({
      username: email,
      password,
    });

    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;
    const result = await adminService.createAdmin({
      fullname,
      email,
      password,
    });
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

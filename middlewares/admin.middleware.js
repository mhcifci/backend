const jwt = require("jsonwebtoken");
const response = require("../interceptors/response.interceptor");
const Admin = require("../services/admin.service");
var clc = require("cli-color");

// Start Class
const adminService = new Admin();

const adminMiddleware = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], process.env.ADMIN_JWT_SECRET);
    const admin = await adminService.getById(decodedToken.id);

    if (!admin) {
      throw new Error("Admin not found.");
    }
    console.log(clc.yellow("------------------------------#--#--#--------------------------------------------"));
    console.warn(clc.magenta("Admin Kullanıcı ID => " + admin.id, admin.name, admin.email));
    console.warn(clc.cyan("Environment => " + process.env.ENVIRONMENT));
    console.log(clc.yellow("------------------------------#--#--#--------------------------------------------"));

    req.admin = admin;
    next();
  } catch (err) {
    console.log(err);
    return response.unauthorized(res, "Not authorized");
  }
};

module.exports = adminMiddleware;

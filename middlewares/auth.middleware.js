const jwt = require("jsonwebtoken");
const response = require("../interceptors/response.interceptor");
const User = require("../services/user.service");

// Start Class
const userService = new User();

const authMiddleware = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
    const user = await userService.getById(decodedToken.id);

    if (!user) {
      throw new Error("User not found.");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return response.unauthorized(res, "Not authorized");
  }
};

module.exports = authMiddleware;

const response = require("../interceptors/response.interceptor");
const UserFcmTokens = require("../services/userFcmTokens.service");

// Start Class
const userFcmTokensService = new UserFcmTokens();

exports.checkToken = async (req, res) => {
  try {
    const user = req.user;
    const token = req.body.token;
    const result = await userFcmTokensService.updateToken(user.id, token);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

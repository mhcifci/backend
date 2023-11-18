const response = require("../interceptors/response.interceptor");
const UserFcmTokens = require("../services/userFcmTokens.service");

// Start Class
const userFcmTokensService = new UserFcmTokens();

exports.checkToken = async (req, res) => {
  try {
    const user = req.user;
    const token = req.body.token;
    await userFcmTokensService.updateToken(user.id, token);
    return response.success(res, [], "Token updated successfully");
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

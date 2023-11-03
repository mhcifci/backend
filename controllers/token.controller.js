const response = require("../interceptors/response.interceptor");
const userFcmTokens = require("../services/userFcmTokens.service");

exports.checkToken = async (req, res) => {
  try {
    const user = req.user;
    const token = req.body.token;
    const result = await userFcmTokens.updateToken(user.id, token);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

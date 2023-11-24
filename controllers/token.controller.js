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

exports.subscribetoAllUsers = async (req, res) => {
  try {
    const token = req.body.token;
    await userFcmTokensService.subscribeAllowedNotifications(token);
    return response.success(res, [], "Token added successfully");
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

// For testing purposes only.
exports.sendMessagetoUser = async (req, res) => {
  try {
    const { title, body, image, token } = req.body;
    const data = {
      default: "1",
    };
    await userFcmTokensService.sendMessagetoUser(title, body, image, token, data);
    return response.success(res, [], "User message send successfully.");
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};
// For testing purposes only.
exports.sendMessagetoTopic = async (req, res) => {
  try {
    const { title, body, image, topic } = req.body;
    const data = {
      default: "1",
    };
    await userFcmTokensService.sendMessagetoTopic(title, body, image, topic, data);
    return response.success(res, [], "Topic message send successfully.");
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

const UserFcmTokens = require("../models/userFcmTokens.model");
const BaseService = require("./base.service");
const user = require("./user.service");
const firebaseHelperClass = require("../utils/firebase.helper");

// Start Class
const userService = new user();
const firebaseHelper = new firebaseHelperClass();
class userFcmTokens extends BaseService {
  constructor() {
    super(UserFcmTokens);
  }

  /**
   * * Check and updates fcm token of the user
   * @param {string} user_id Id of the user
   * @param {string} token FCM token of the user
   * @returns {Object} Result of FCM Token
   */
  async updateToken(user_id, token) {
    // Kullanıcının varlığını kontrol et.
    const checkUser = await userService.getById(user_id);
    if (!checkUser) {
      throw new Error("User not found");
    }

    // Kullanıcı tablosunda checkUser.id var mı kontrol et
    const checkUserToken = await this.getWithCondition({
      user_id: checkUser.id,
    });

    if (!checkUserToken) {
      await this.create({
        user_id: checkUser.id,
        token: token,
      });
      return "User token created successfully";
    } else if (checkUserToken.token !== token) {
      await checkUserToken.update({ token: token });
      return "User token updated successfully";
    } else {
      return "User token updated successfully";
    }
  }

  // Unregistered user subscribe to topic
  async subscribeAllowedNotifications(token) {
    const result = await firebaseHelper.subscribeUserAllowedNotifications(token);
    if (result.failureCount === 1) {
      throw new Error(result.errors[0].error.message);
    }
    return "Token saved successfully.";
  }

  // For testing purpose
  async sendMessagetoUser(title, body, image, token, data = { default: "1" }) {
    const result = await firebaseHelper.sendNotificationUser(title, body, image, token, data);
    return result;
  }
  async sendMessagetoTopic(title, body, image, topic, data = { default: "1" }) {
    const result = await firebaseHelper.sendNotificationtoTopic(title, body, image, topic, data);
    return result;
  }
}

module.exports = userFcmTokens;

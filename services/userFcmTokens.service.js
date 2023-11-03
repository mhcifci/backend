const UserFcmTokens = require("../models/userFcmTokens.model");
const BaseService = require("./base.service");
const userService = require("./user.service");

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
}

module.exports = new userFcmTokens();

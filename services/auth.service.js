const { Op } = require("sequelize");
const User = require("../models/user.model");
const UserLostPasswords = require("../models/userLostPasswords.model");
const BaseService = require("./base.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService extends BaseService {
  constructor() {
    super(User);
  }

  /**
   * * Login the user with email and password
   * @param {string} data Email of the user
   * @param {string} data Password of the user
   * @returns {Object} User details & JWT Token
   */
  async loginUser(data) {
    const existingUser = await this.getWithCondition({
      email: data.email,
    });

    if (!existingUser) {
      throw new Error("User not found.");
    }

    const passwordMatch = await bcrypt.compare(data.password, existingUser.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password.");
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.LOGIN_SESSION_TIME }
    );
    // return await this.create(user);
    return { user: existingUser, token: token };
  }

  /**
   * Sending email to the user with reset password link
   * return {string} Code
   */
  async sendLostPassword(email) {
    // Find user
    const existingUser = await this.getWithCondition({
      email: email,
    });

    if (!existingUser) {
      throw new Error("User not found.");
    }

    // Kullanıcı saatte bir defa kod gönderebilir
    const existingCode = await UserLostPasswords.findOne({
      where: {
        user_id: existingUser.id,
        created_at: {
          [Op.gte]: new Date(new Date() - 60 * 60 * 1000),
        },
      },
    });

    if (existingCode) {
      throw new Error("You can send code once an hour.");
    }

    // 6 haneli sayısal kod üretelim
    const code = Math.floor(100000 + Math.random() * 900000);

    // Save code to database
    await UserLostPasswords.create({
      user_id: existingUser.id,
      code: code,
    });

    // TODO: Send email to user

    // return true;
    return true;
  }
}

module.exports = AuthService;

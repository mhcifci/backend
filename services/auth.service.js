const { Op } = require("sequelize");
const User = require("../models/user.model");
const UserLostPasswords = require("../models/userLostPasswords.model");
const BaseService = require("./base.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Email = require("./email.service");

// Start Class
const EmailService = new Email();

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

    // Kullanıcı saatte bir defa kod gönderebilir, ancak kod kullanılmamışsa
    const existingCode = await UserLostPasswords.findOne({
      where: {
        user_id: existingUser.id,
        is_used: false,
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
      is_used: false,
    });

    await EmailService.sendLostPasswordEmail(existingUser.email, {
      code: code,
    });

    return true;
  }

  async changeLostPassword(code, email, new_password, re_password) {
    // Find user
    const existingUser = await this.getWithCondition({
      email: email,
    });

    if (!existingUser) {
      throw new Error("User not found.");
    }

    // Find code
    const existingCode = await UserLostPasswords.findOne({
      where: {
        user_id: existingUser.id,
        created_at: {
          [Op.gte]: new Date(new Date() - 60 * 60 * 1000),
        },
      },
    });

    if (!existingCode) {
      throw new Error("Code not found.");
    }

    // Check code
    if (existingCode.code !== code) {
      throw new Error("Code is incorrect.");
    }

    // Check code is used
    if (existingCode.is_used) {
      throw new Error("Code is already used.");
    }

    // Check password
    if (new_password !== re_password) {
      throw new Error("Passwords do not match.");
    }

    // Update user password
    await this.update(existingUser.id, {
      password: await bcrypt.hash(new_password, 10),
    });

    // Update code to is_used
    await UserLostPasswords.update(
      {
        is_used: true,
      },
      {
        where: {
          id: existingCode.id,
        },
      }
    );

    return true;
  }
}

module.exports = AuthService;

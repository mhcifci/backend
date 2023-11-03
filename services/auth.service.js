const { Op } = require("sequelize");
const User = require("../models/user.model");
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
}

module.exports = new AuthService();

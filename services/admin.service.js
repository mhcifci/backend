const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin.model");
const BaseService = require("./base.service");

class AdminService extends BaseService {
  constructor() {
    super(Admin);
  }

  async authAdmin(data) {
    const adminUser = await this.getWithCondition({
      email: data.email,
    });

    if (!adminUser) {
      throw new Error("Admin not found.");
    }

    const passwordMatch = await bcrypt.compare(data.password, adminUser.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password.");
    }

    const token = jwt.sign(
      {
        id: adminUser.id,
        email: adminUser.email,
      },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: process.env.LOGIN_SESSION_TIME }
    );
    return { admin: adminUser, token: token };
  }

  async createAdmin(data) {
    const existingUser = await this.getWithCondition({
      email: data.email,
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new Error("E-posta adresi zaten mevcut.");
      } else {
        throw new Error("Telefon numarası zaten mevcut.");
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = {
      fullname: data.fullname,
      password: hashedPassword,
      email: data.email,
    };
    await this.create(user);
    const auth = await this.authAdmin({
      email: data.email,
      password: data.password,
    });
    return {
      ...user,
      token: auth.token,
    };
  }
}

module.exports = AdminService;

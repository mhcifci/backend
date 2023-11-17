const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const BaseService = require("./base.service");
const UserDetails = require("./userDetails.service");

class UserService extends BaseService {
  constructor() {
    super(User);
    this.UserDetailsService = new UserDetails();
  }

  async createUser(data) {
    const existingUser = await this.getWithCondition({
      [Op.or]: [{ email: data.email }, { phone: data.phone }],
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
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      country_code: data.country_code,
      password: hashedPassword,
      email: data.email,
    };
    return await this.create(user);
  }

  async updateUser(id, data) {
    const existingUser = await this.getWithCondition({
      [Op.or]: [{ email: data.email }, { phone: data.phone }],
      [Op.not]: { id: id },
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new Error("E-posta adresi zaten mevcut.");
      } else {
        throw new Error("Telefon numarası zaten mevcut.");
      }
    }

    const user = {
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      country_code: data.country_code,
      password: data.password,
      email: data.email,
    };

    const [updatedRowsCount] = await this.update(user, {
      where: { id: id },
    });

    if (updatedRowsCount === 0) {
      throw new Error("Kullanıcı güncelleme hatası.");
    }

    return user;
  }

  async getUserDetails(id) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı.");
    }
    const userProfilePicture = await this.UserDetailsService.getProfilePicture(user);

    return { user, userProfilePicture };
  }

  async changePassword(id) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    // Kullanıcı şifresi güncellenir
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return;
  }
}

module.exports = UserService;

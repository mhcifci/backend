const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const BaseService = require("./base.service");
const UserDetails = require("./userDetails.service");

// Start Class
const UserDetailsService = new UserDetails();

class UserService extends BaseService {
  constructor() {
    super(User);
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
    const userProfilePicture = await UserDetailsService.getProfilePicture(user);

    return { user, userProfilePicture };
  }

  async changePassword(id, old_password, new_password) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordMatch = await bcrypt.compare(old_password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Old password not match.");
    }
    // Kullanıcı şifresi güncellenir
    const hashedPassword = await bcrypt.hash(new_password, 10);

    const updatePassword = await user.update({
      password: hashedPassword,
    });

    return updatePassword;
  }
}

module.exports = UserService;

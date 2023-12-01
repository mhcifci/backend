const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const BaseService = require("./base.service");
const Email = require("./email.service");
const UserDetails = require("./userDetails.service");

// Start Class
const UserDetailsService = new UserDetails();
const EmailService = new Email();

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
    await EmailService.sendWelcomeEmail("mhcifci@gmail.com", "Test Email", "Test Email");
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
    const getUserPreferences = await UserDetailsService.getUserPreferences(parseInt(user.id));
    const getUserType = await UserDetailsService.getUserType(parseInt(user.id));
    return { user, userProfilePicture, userType: getUserType.user_type, preffereds: getUserPreferences };
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

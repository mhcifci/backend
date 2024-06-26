const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const BaseService = require("./base.service");
const Email = require("./email.service");
const UserDetails = require("./userDetails.service");
const Auth = require("./auth.service");

// Start Class
const UserDetailsService = new UserDetails();
const EmailService = new Email();
const AuthService = new Auth();

class UserService extends BaseService {
  constructor() {
    super(User);
  }
  async searchUsers(page = 1, limit = 10, name, surname, email, phone, is_active, startDate, endDate) {
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (surname) where.surname = { [Op.like]: `%${surname}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (phone) where.phone = { [Op.like]: `%${phone}%` };
    if (is_active) where.is_active = { [Op.eq]: is_active };
    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at[Op.gte] = new Date(startDate);
      if (endDate) {
        where.created_at[Op.lte] = new Date(endDate);
      } else {
        where.created_at[Op.lte] = new Date(); // Şimdiki zamanı kullan
      }
    }
    const { count, rows } = await User.findAndCountAll({
      where: where,
      order: [
        ["created_at", "DESC"],
        ["id", "DESC"],
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      records: rows,
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
      total: count,
      totalPages: Math.ceil(count / parseInt(limit)),
    };
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
    await this.create(user);
    await EmailService.sendWelcomeEmail(data.email, "Welcome to SDL Pro!", "");
    const auth = await AuthService.loginUser({
      email: data.email,
      password: data.password,
    });
    return {
      ...user,
      token: auth.token,
    };
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

  async deleteAccount(id, password) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Password not match.");
    }

    const updatedRowsCount = await this.update(parseInt(id), {
      is_active: 0,
    });

    if (updatedRowsCount === 0) {
      throw new Error("Proccess Failed.");
    }

    return true;
  }
}

module.exports = UserService;

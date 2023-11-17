const { Op } = require("sequelize");
const Companies = require("../models/companies.model");
const BaseService = require("./base.service");
const User = require("./user.service");

// Start Class
const UserService = new User();

class CompaniesService extends BaseService {
  constructor() {
    super(Companies);
  }

  async createCompany(data) {
    // Kullanıcının varlığını kontrol et.
    const checkUser = await UserService.getById(data.user_id);
    if (!checkUser) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    // Kullanıcının firması var mı kontrol et?
    const checkCompany = await this.getWithCondition({
      user_id: data.user_id,
    });
    if (checkCompany) {
      throw new Error("Kullanıcının zaten firma profili bulunuyor.");
    }

    if (!data.company_name) {
      throw new Error("Firma ismini giriniz.");
    }
    if (!data.company_phone) {
      throw new Error("Firma telefon numarası giriniz.");
    }
    // Tüm şartlar sağlanırsa firmayı oluştur.
    return await this.create({
      user_id: data.user_id,
      title: data.company_name,
      company_phone: data.company_phone,
    });
  }

  async getCompanyByUser(user_id) {
    // Kullanıcının varlığını kontrol et.
    const checkUser = await UserService.getById(user_id);
    if (!checkUser) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    // Kullanıcının firması var mı kontrol et?
    return await this.getWithCondition({
      user_id: user_id,
    });
  }
}

module.exports = CompaniesService;

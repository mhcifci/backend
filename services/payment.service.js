require("../models/associations/orders.model");
const Package = require("../models/packages.model");
const { Op } = require("sequelize");
const BaseService = require("./base.service");
const Packages = require("./packages.service");

const PackagesService = new Packages();

class PaymentService extends BaseService {
  constructor() {
    super(Orders);
  }

  // Sipariş oluştur
  async createPayment(page, limit) {}
}

module.exports = PaymentService;

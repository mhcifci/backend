require("../models/associations/appleProducts.model");
const AppleProductsModel = require("../models/appleProducts.model");
const { Op } = require("sequelize");
const BaseService = require("./base.service");
const AppleProducts = require("./appleProducts.service");
const UserTransactions = require("./userTransactions.service");
const AppleOrders = require("../models/appleOrders.model");
const User = require("../models/user.model");
const crypto = require("crypto");

// Start Class
const UserTransactionsService = new UserTransactions();
const AppleProductsService = new AppleProducts();

class AppleOrderService extends BaseService {
  constructor() {
    super(AppleOrders);
  }

  async completeOrder(user_id, product_id, order_key) {
    if (!user_id) throw new Error("User ID is required");
    const order = await this.getWithCondition({
      user_id: parseInt(user_id),
      product_id: product_id,
      order_key: order_key,
      status: "PENDING",
    });

    if (!order) throw new Error("Order not found or completed. Please check again.");

    // Kullanıcının balancea bakiyeyi ekle
    // Package bilgisini al.
    const product_detail = await AppleProductsService.getById(parseInt(product_id));
    if (!product_detail) throw new Error("Package not found");

    const creditAmount = product_detail.amount;

    await UserTransactionsService.updateUserBalance(parseInt(user_id), creditAmount, `Apple Pay Successfull: ${order_key}`);

    await this.model.update(
      {
        status: "COMPLETED",
      },
      {
        where: {
          order_key: order_key,
        },
      }
    );

    return { message: "Your transactions are successfull!" };
  }

  // Tüm siparişleri getir
  async getAllOrders(page, limit) {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    // const totalCount = await this.model.count();
    const records = await this.model.findAll({
      limit: parseInt(limit),
      offset: offset,
      include: [
        {
          model: AppleProductsModel,
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "surname", "phone", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return {
      data: records,
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
      total: records.length,
      totalPages: Math.ceil(records.length / parseInt(limit)),
    };
  }

  // Kullanıcı bazlı tüm siparişleri getir
  async getAllOrdersByUserApple(user_id, page, limit) {
    if (!user_id) throw new Error("User ID is required");
    const offset = (parseInt(page) - 1) * parseInt(limit);
    // const totalCount = await this.model.count();
    const records = await this.model.findAll({
      limit: parseInt(limit),
      offset: offset,
      include: [
        {
          model: AppleProductsModel,
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "surname", "phone", "email"],
        },
      ],
      where: {
        user_id: parseInt(user_id),
      },
      order: [["created_at", "DESC"]],
    });

    return {
      data: records,
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
      total: records.length,
      totalPages: Math.ceil(records.length / parseInt(limit)),
    };
  }

  async createOrder(user_id, package_id) {
    // package'in geçerli olup olmadığı kontrol edilir.
    const product_detail = await AppleProductsService.getById(package_id);
    if (!product_detail) throw new Error("Package not found");

    // Sipariş oluşturulur.
    const orderKey = await this.generateUniqueKey(25, "order-apple-");

    // Orderı oluştur.
    const order = await this.model.create({
      user_id: parseInt(user_id),
      product_id: parseInt(product_detail.id),
      order_key: orderKey,
      status: "PENDING",
    });

    return order;
  }

  // Helper functions:
  async generateUniqueKey(maxLength = "25", startWord = "", endWord = "") {
    // Unix zaman damgasını alır.
    const timestamp = await Math.floor(Date.now() / 1000).toString();

    // Rastgele bir string üretir ve hex formatına dönüştürür.
    let randomPart = await crypto.randomBytes(16).toString("hex");

    // Zaman damgasını, belirtilen başlangıç ve bitiş kelimeleriyle birleştirir.
    let key = startWord + timestamp + randomPart + endWord;

    // Eğer maksimum uzunluk belirtilmişse, bu uzunluğa göre keser.
    if (maxLength && key.length > maxLength) {
      key = key.substring(0, maxLength);
    }

    return await key;
  }
}

module.exports = AppleOrderService;

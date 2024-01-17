require("../models/associations/orders.model");
const Package = require("../models/packages.model");
const { Op } = require("sequelize");
const BaseService = require("./base.service");
const Packages = require("./packages.service");
const Orders = require("../models/orders.model");
const User = require("../models/user.model");
const crypto = require("crypto");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Start Class
const PackagesService = new Packages();

class OrdersService extends BaseService {
  constructor() {
    super(Orders);
  }

  async completeOrder(user_id, id) {
    if (!user_id) throw new Error("User ID is required");
    const order = await this.getWithCondition({
      id: parseInt(id),
      user_id: parseInt(user_id),
      status: "PENDING",
    });

    if (!order) throw new Error("Order not found or completed. Please check again.");
    const { status, client_secret } = await stripe.paymentIntents.retrieve(order.stripe_id);
    switch (status) {
      case "succeeded":
        throw new Error("Your order is completed, please check again.");
        break;
      case "processing":
        throw new Error("Your order is processing. Please check later.");
        break;
    }

    return { order, client_secret };
  }

  async webhook(sig, requestBody) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(requestBody, sig, "whsec_39dce7651fa48d6198026879bbb74456373b1b3e9b9d2b057fdda91f1fda2617");
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntentSucceeded = event.data.object;
          console.log(paymentIntentSucceeded);

          // Kullanıcının balancea bakiyeyi ekle

          // Order'ı completed'a çek

          // success dön

          break;
      }
    } catch (error) {
      console.log(error);
    }
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
          model: Package,
          as: "package",
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
  async getAllOrdersByUser(user_id, page, limit) {
    if (!user_id) throw new Error("User ID is required");
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const records = await this.model.findAll({
      limit: parseInt(limit),
      offset: offset,
      include: [
        {
          model: Package,
          as: "package",
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

  // Yeni bir sipariş oluştur
  async createOrder(user_id, package_id) {
    // Önce kullanıcının siparişlerinde "pending" durumunda olan sipariş var mı kontrol edelim.
    const pendingOrder = await this.model.findOne({
      where: {
        user_id: parseInt(user_id),
        status: "PENDING",
      },
    });
    if (pendingOrder) throw new Error("You have a pending order");

    // package'in geçerli olup olmadığı kontrol edilir.
    const packageDetail = await PackagesService.getById(package_id);
    if (!packageDetail) throw new Error("Package not found");

    // Sipariş oluşturulur.
    const orderKey = await this.generateUniqueKey(25, "order");

    // Orderı oluştur.
    const order = await this.model.create({
      user_id: parseInt(user_id),
      package_id: parseInt(packageDetail.id),
      order_key: orderKey,
      status: "PENDING",
    });

    // Stripe ile ödemeyi başlat
    const paymentIntent = await stripe.paymentIntents.create({
      amount: packageDetail.price * 100,
      currency: "gbp",
      description: `Created payment intent for: ${orderKey}`,
      metadata: { user_id: parseInt(user_id), package_id: parseInt(packageDetail.id) },
    });

    const data = await this.update(order.id, {
      stripe_id: paymentIntent.id,
    });

    return { data, stripe_payment_id: paymentIntent.id, stripe_client_secret: paymentIntent.client_secret };
  }

  async cancelOrder(user_id, orderId) {
    const order = await this.getWithCondition({
      order_key: orderId,
      user_id: parseInt(user_id),
      status: "PENDING",
    });
    if (!order) {
      throw new Error("Order not found");
    }
    const updatedOrder = await order.update({ status: "CANCELLED" });
    return updatedOrder;
  }

  async confirmOrder(orderId) {
    const order = await this.getWithCondition({
      order_key: orderId,
      status: "COMPLETED",
    });
    if (!order) {
      throw new Error("Order not found");
    }
    const updatedOrder = await order.update({ status: "COMPLETED" });
    return updatedOrder;
  }

  // Belirli bir ID'ye sahip siparişi getir
  async getOrderById(orderId) {
    try {
      const order = await this.getById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      // Hata yönetimi
      throw error;
    }
  }

  // Siparişi güncelle
  async updateOrder(orderId, updateData) {
    try {
      const order = await this.getById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      const updatedOrder = await order.update(updateData);
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  }

  // Siparişi sil
  async deleteOrder(orderId) {
    try {
      const order = await this.getById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      await order.destroy();
      return { message: "Order deleted successfully" };
    } catch (error) {
      // Hata yönetimi
      throw error;
    }
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

module.exports = OrdersService;

const { Op } = require("sequelize");
const BaseService = require("./base.service");
const UserTransactions = require("../models/userTransactions.model");
const sequelize = require("../config/database");

class UserTransactionsService extends BaseService {
  constructor() {
    super(UserTransactions);
  }

  async getUserBalance(user_id) {
    const userBalance = await UserTransactions.findOne({
      attributes: [[sequelize.fn("SUM", sequelize.col("amount")), "total_balance"]],
      where: { user_id: parseInt(user_id) },
    });

    return userBalance.getDataValue("total_balance") ? parseInt(userBalance.getDataValue("total_balance")) : 0;
  }

  async updateUserBalance(user_id, amount, reason = null) {
    if (!user_id) {
      throw new Error("User not found.");
    }

    if (amount === undefined || amount === null || amount === 0) {
      throw new Error("Amount is required.");
    }

    const data = await UserTransactions.create({
      user_id: user_id,
      amount: amount,
      reason,
    });
    const balance = await this.getUserBalance(user_id);

    return { data: data.dataValues, balance: balance };
  }
}

module.exports = new UserTransactionsService();

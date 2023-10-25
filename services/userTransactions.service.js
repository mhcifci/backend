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
      where: { user_id: user_id },
    });

    return userBalance.getDataValue("total_balance") ? userBalance.getDataValue("total_balance") : 0;
  }

  async addUserBalance(user_id, amount) {
    // First create transaction
    await UserTransactions.create({
      user_id: user_id,
      amount: amount,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.calculateUserBalance(user_id);
    return await this.getUserBalance(user_id);
  }
}

module.exports = new UserTransactionsService();

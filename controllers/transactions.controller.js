const response = require("../interceptors/response.interceptor");
const Transactions = require("../services/userTransactions.service");

// Start Class
const transactionService = new Transactions();

exports.getAll = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await transactionService.getAllWithPagination(page, limit, {
      user_id: req.user.id,
    });
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const result = await transactionService.getSingleTransactionDetail(user.id, id);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.getBalance = async (req, res) => {
  try {
    const user = req.user;
    const result = await transactionService.getUserBalance(user.id);
    return response.success(res, {
      balance: result,
    });
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

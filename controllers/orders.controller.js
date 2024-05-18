const response = require("../interceptors/response.interceptor");
const AppleOrders = require("../services/appleOrders.service");
const AppleProducts = require("../services/appleProducts.service");
const Orders = require("../services/orders.service");

// Start Class
const OrdersService = new Orders();
const AppleOrderService = new AppleOrders();
const AppleProductsService = new AppleProducts();

// get all orders by user
exports.getAllByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { limit = 10, page = 1 } = req.query;
    const result = await OrdersService.getAllOrdersByUser(id, page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.createNewOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { package_id } = req.body;
    const result = await OrdersService.createOrder(id, package_id);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.webhook = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const requestBody = req.body;
    console.log(requestBody);
    const result = await OrdersService.webhook(sig, requestBody);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.completeOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { order_id } = req.params;
    const result = await OrdersService.completeOrder(id, order_id);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { order_id } = req.params;

    const result = await OrdersService.cancelOrder(id, order_id);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Apple
// get all orders by user
exports.getAllByUserforApple = async (req, res) => {
  try {
    const { id } = req.user;
    const { limit = 10, page = 1 } = req.query;
    const result = await AppleOrderService.getAllOrdersByUserApple(id, page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.createNewOrderApple = async (req, res) => {
  try {
    const { id } = req.user;
    const { product_id } = req.body;
    const result = await AppleOrderService.createOrder(id, product_id);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.completeOrderForApple = async (req, res) => {
  try {
    const { id } = req.user;
    const { product_id, order_key } = req.body;
    const result = await AppleOrderService.completeOrder(id, product_id, order_key);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

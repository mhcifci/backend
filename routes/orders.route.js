const express = require("express");
const router = express.Router();
const orders = require("../controllers/orders.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/list", authMiddleware, orders.getAllByUser);
// router.get("/detail/:id", authMiddleware, orders.get);
router.post("/new", authMiddleware, orders.createNewOrder);
router.get("/complete-order/:order_id", authMiddleware, orders.completeOrder);
router.get("/cancel/:order_id", authMiddleware, orders.cancelOrder);

router.post("/stripe-webhook", express.raw({ type: "application/json" }), orders.webhook);
router.get("/apple/list", authMiddleware, orders.getAllByUserforApple);
router.post("/apple/new", authMiddleware, orders.createNewOrderApple);
router.post("/apple/complete-order", authMiddleware, orders.completeOrderForApple);

module.exports = router;

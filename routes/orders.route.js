const express = require("express");
const router = express.Router();
const orders = require("../controllers/orders.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/list", authMiddleware, orders.getAllByUser);
// router.get("/detail/:id", authMiddleware, orders.get);
router.post("/new", authMiddleware, orders.createNewOrder);
router.get("/cancel/:order_id", authMiddleware, orders.cancelOrder);

module.exports = router;

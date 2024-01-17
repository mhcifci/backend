const express = require("express");
const router = express.Router();
const orders = require("../controllers/orders.controller");

router.post("/stripe", express.raw({ type: "application/json" }), orders.webhook);
module.exports = router;

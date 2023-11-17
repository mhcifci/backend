const express = require("express");
const router = express.Router();
const transactions = require("../controllers/transactions.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/list", authMiddleware, transactions.getAll);
router.get("/get-balance", authMiddleware, transactions.getBalance);
router.get("/detail/:id", authMiddleware, transactions.get);

module.exports = router;

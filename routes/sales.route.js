const express = require("express");
const router = express.Router();
const sales = require("../controllers/sales.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/list", authMiddleware, sales.getAllCategoriesWithItems);
router.get("/categories", authMiddleware, sales.getAllCategories);

// post ile form almak için route oluştur service aç

module.exports = router;

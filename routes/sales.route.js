const express = require("express");
const router = express.Router();
const sales = require("../controllers/sales.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/list", authMiddleware, sales.getAllCategoriesWithItems);
router.get("/categories", authMiddleware, sales.getAllCategories);



router.post("/new", authMiddleware, sales.createNewSalesOrder);



module.exports = router;

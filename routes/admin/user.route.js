const express = require("express");
const router = express.Router();

// Admin middleware
const adminMiddleware = require("../../middlewares/admin.middleware");

// Base controller
const routeBaseController = require("../../controllers/admin/user.controller");

// Sabit yapılar olacak ki kopyalayabilelim
router.get("/list", adminMiddleware, routeBaseController.getAll);
router.get("/detail/:id", adminMiddleware, routeBaseController.getById);
// router.post("/add", adminMiddleware, routeBaseController.createNewOrder);
// router.post("/delete", adminMiddleware, routeBaseController.createNewOrder);
// router.post("/update/:id", adminMiddleware, routeBaseController.createNewOrder);

module.exports = router;

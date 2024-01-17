const express = require("express");
const router = express.Router();

// Base controller
const routeBaseController = require("../../controllers/admin/auth.controller");

// Sabit yapılar olacak ki kopyalayabilelim
router.post("/", routeBaseController.authAdmin);
router.post("/create", routeBaseController.createAdmin);

module.exports = router;

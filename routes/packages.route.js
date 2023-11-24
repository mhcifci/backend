const express = require("express");
const router = express.Router();
const packages = require("../controllers/packages.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/list", authMiddleware, packages.getAll);
router.get("/detail/:id", authMiddleware, packages.get);

module.exports = router;

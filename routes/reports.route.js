const express = require("express");
const router = express.Router();
const reports = require("../controllers/reports.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/list", authMiddleware, reports.getAll);

module.exports = router;

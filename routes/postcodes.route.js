const express = require("express");
const router = express.Router();
const postcodes = require("../controllers/postcodes.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/search", authMiddleware, postcodes.autoComplete);

module.exports = router;

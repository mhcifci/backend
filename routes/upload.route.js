const express = require("express");
const router = express.Router();
const upload = require("../controllers/upload.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const MulterUpload = multer({
  storage: multer.memoryStorage(),
});

router.post("/new", authMiddleware, MulterUpload.single("file"), upload.create);

module.exports = router;

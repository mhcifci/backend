const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const MulterUpload = multer({
  storage: multer.memoryStorage(),
});
router.post("/profile-picture", authMiddleware, MulterUpload.single("file"), profile.changeProfilePicture);
router.get("/detail", authMiddleware, profile.getProfileInformation);

module.exports = router;

const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body, validationResult } = require("express-validator");

const multer = require("multer");
const MulterUpload = multer({
  storage: multer.memoryStorage(),
});

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return response.badRequest(res, "Required fields could not be verified.");
};
const updatePasswordRules = [
  body("old_password")
    .isLength({
      min: 6,
      max: 12,
    })
    .notEmpty()
    .withMessage("Password must be between 6 and 12 characters."),
  body("new_password")
    .isLength({
      min: 6,
      max: 12,
    })
    .notEmpty()
    .withMessage("Password must be between 6 and 12 characters."),
];

router.post("/profile-picture", authMiddleware, MulterUpload.single("file"), profile.changeProfilePicture);
router.get("/detail", authMiddleware, profile.getProfileInformation);
router.post("/update-password", authMiddleware, updatePasswordRules, validate, profile.changePassword);
router.get("/preferences", authMiddleware, profile.getPreferences);
router.post("/update-preferences", authMiddleware, profile.updatePreferences);
router.post("/set-type/:type_of_user", authMiddleware, profile.setUserType);
router.get("/user-types", authMiddleware, profile.getAllUserTypes);

module.exports = router;

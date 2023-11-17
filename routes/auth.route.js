const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const response = require("../interceptors/response.interceptor");
const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return response.badRequest(res, "Required fields could not be verified.");
};
const loginValidationRules = [body("email").isEmail().withMessage("Invalid email format"), body("password").notEmpty().withMessage("Password is required")];
const lostPasswordRules = [body("email").isEmail().withMessage("Invalid email format")];

//email, code, new_password, re_password gerekli olacak
const changeLostPasswordRules = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("code")
    .isLength({
      min: 6,
      max: 12,
    })
    .notEmpty()
    .withMessage("Code is required"),
  body("new_password")
    .isLength({
      min: 6,
      max: 12,
    })
    .notEmpty()
    .withMessage("New password must be between 6 and 12 characters."),
  body("re_password")
    .isLength({
      min: 6,
      max: 12,
    })
    .notEmpty()
    .withMessage("New password must be between 6 and 12 characters."),
  body("re_password").custom((value, { req }) => {
    if (value !== req.body.new_password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

router.post("/login", loginValidationRules, validate, auth.loginUser);

// For a sending lost password email
router.post("/lost-password", lostPasswordRules, validate, auth.sendLostPassword);
router.post("/change-lost-password", changeLostPasswordRules, validate, auth.changeLostPassword);

module.exports = router;

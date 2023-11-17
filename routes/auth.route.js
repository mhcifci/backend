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

router.post("/login", loginValidationRules, validate, auth.loginUser);

// For a sending lost password email
router.post("/lost-password", lostPasswordRules, validate, auth.sendLostPassword);

module.exports = router;

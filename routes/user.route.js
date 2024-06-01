const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const response = require("../interceptors/response.interceptor");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return response.badRequest(res, "Required fields could not be verified.");
};
const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("surname").notEmpty().withMessage("Surname is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("country_code").notEmpty().withMessage("Country code is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("email").isEmail().withMessage("Invalid email format"),
];

router.post("/", userValidationRules, validate, auth.createUser);
router.post("/delete-account", authMiddleware, auth.deleteAccount);

module.exports = router;

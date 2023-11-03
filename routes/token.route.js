const express = require("express");
const router = express.Router();
const token = require("../controllers/token.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body, validationResult } = require("express-validator");

const tokenRules = [body("token").notEmpty()];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return response.badRequest(res, "Required fields could not be verified.");
};

router.post("/check", authMiddleware, tokenRules, validate, token.checkToken);

module.exports = router;

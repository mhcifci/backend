const express = require("express");
const router = express.Router();
const design = require("../controllers/design.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return response.badRequest(res, `Required fields could not be verified. ${JSON.stringify(errors.array())}`);
};
const rules = [body("description").isLength({ min: 10, max: 500 }), body("country").isLength({ min: 3, max: 55 })];

const newRequestRules = [
  body("country").isLength({ min: 3, max: 55 }),
  body("email").isEmail(),
  body("country_code").isLength({ min: 2, max: 5 }),
  body("phone").isLength({ min: 5, max: 15 }),
  body("category_id").isInt(),
  body("description").isLength({ min: 10, max: 500 }),
];

router.post("/new", authMiddleware, rules, validate, design.create);
router.post("/request/new", newRequestRules, validate, design.createforNotMember);

// all categories
router.get("/categories", design.getDesignCategories);

module.exports = router;

const express = require("express");
const router = express.Router();
const listing = require("../controllers/listing.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return response.badRequest(res, "Required fields could not be verified.");
};

const rules = [body("category_id").isInt(), body("description").isLength({ min: 10, max: 500 }), body("country").isLength({ min: 3, max: 55 })];

router.get("/list", authMiddleware, listing.getAll);
// single detail
router.get("/detail/:id", authMiddleware, listing.get);
// all categories
router.get("/categories", authMiddleware, listing.getListingCategories);
// single category detail
router.get("/category/:id", authMiddleware, listing.getListingCategory);
// list by category
router.get("/by-category/:id", authMiddleware, listing.getListingsByCategory);
// Jobs open
router.get("/show-information/:id", authMiddleware, listing.showInformation);
// Create Job
router.post("/new", authMiddleware, rules, validate, listing.create);

module.exports = router;

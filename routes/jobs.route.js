const express = require("express");
const router = express.Router();
const jobs = require("../controllers/jobs.controller");
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

router.get("/list", authMiddleware, jobs.getAll);
// single detail
router.get("/detail/:id", authMiddleware, jobs.get);
// all categories
router.get("/categories", authMiddleware, jobs.getJobsCategories);
// single category detail
router.get("/category/:id", authMiddleware, jobs.getJobsCategory);
// list by category
router.get("/by-category/:id", authMiddleware, jobs.getJobsByCategory);
// Jobs open
router.get("/show-information/:id", authMiddleware, jobs.showInformation);
// Create Job
router.post("/new", authMiddleware, rules, validate, jobs.create);

module.exports = router;

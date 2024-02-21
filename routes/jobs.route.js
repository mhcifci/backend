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

router.get("/list/public", jobs.getAllPublic);

router.get("/list", authMiddleware, jobs.getAll);
// With preffered
router.get("/list/by-preffered", authMiddleware, jobs.getJobsbyPreffered);
// With spesific
router.get("/list/by-spesific", authMiddleware, jobs.getListingByPostcodeAndRadius);
// single detail
router.get("/detail/:id", authMiddleware, jobs.get);
// all categories
router.get("/categories", authMiddleware, jobs.getListingCategories);
// single category detail
router.get("/category/:id", authMiddleware, jobs.getListingCategory);
// list by category
router.get("/by-category/:id", authMiddleware, jobs.getListingsByCategory);

// Jobs open
router.get("/show-information/:id", authMiddleware, jobs.showInformation);
// Create Job
router.post("/new", authMiddleware, rules, validate, jobs.create);

// Search
router.get("/search", authMiddleware, jobs.searchListings);
router.get("/search-new", authMiddleware, jobs.searchListingsNew);
// Search by category
router.get("/search/:category_id", authMiddleware, jobs.searchListingsbyCategory);
// With spesific postcode and mile
router.get("/list/search/by-spesific", authMiddleware, jobs.searchListingByPostcodeAndRadius);

// Followed Listings
router.get("/followed", authMiddleware, jobs.getFollowedJobs);
router.get("/not-interesteds", authMiddleware, jobs.getNotInterestedListings);

// MARK Follow Listing
router.get("/follow/:id", authMiddleware, jobs.doFollow);
// MARK Unfollow Listing
router.get("/unfollow/:id", authMiddleware, jobs.deleteFollow);
// MARK Not Interested Listing
router.get("/not-interested/:id", authMiddleware, jobs.notInterested);

// Qualifications
router.get("/qualifications", authMiddleware, jobs.getQualifications);
router.get("/qualifications/categories", authMiddleware, jobs.getQualificationCategories);
router.get("/qualifications/by-category/:id", authMiddleware, jobs.getQualificationbyCategory);

module.exports = router;

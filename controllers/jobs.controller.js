const response = require("../interceptors/response.interceptor");
const Jobs = require("../services/jobs.service");
const JobsCategories = require("../services/jobsCategories.service");
const userFollowJobs = require("../services/userFollowJobs.service");
const JobQualification = require("../services/jobQualification.service");

// Start Class
const jobsService = new Jobs();
const jobsCategoriesService = new JobsCategories();
const UserFollowJobService = new userFollowJobs();
const jobQualificationService = new JobQualification();

exports.getAll = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;
    const result = await jobsService.getJobsbyUser(user.id, page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getAllPublic = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await jobsService.getListingsbyPublic(page, limit, {
      is_active: true,
    });
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};
exports.getFollowedJobs = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;
    const result = await jobsService.getFollowedJobs(user.id, page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getNotInterestedListings = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;
    const result = await jobsService.getNotInterestedListings(user.id, page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const result = await jobsService.getListingDetail(user.id, id);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const user = req.user;
    const result = await jobsService.createListing(user.id, {
      category_id: req.body.category_id,
      description: req.body.description,
      country: req.body.country,
      is_active: false,
      include_files: req.body.include_files,
      job_qualifications: req.body.job_qualifications,
    });
    return response.success(res, result, "Jobs created successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// All
exports.getListingCategories = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await jobsCategoriesService.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Single category information
exports.getListingCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await listingService.getById(parseInt(id));
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getListingsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, page = 1 } = req.query;
    const user = req.user;

    const result = await jobsService.getListingsbyCategory(parseInt(page), parseInt(limit), parseInt(id), parseInt(user.id));
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.showInformation = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await jobsService.viewInformation(user.id, id);
    return response.success(res, result, "Listing opened successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getListingCategory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await listingCategoryService.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Kullanıcının tercihlerine göre ilanları getirir.
exports.getJobsbyPreffered = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;
    const data = await jobsService.getListingsByPreferences(user.id, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getListingByPostcodeAndRadius = async (req, res) => {
  try {
    const user = req.user;
    const { postcode, mile = 10, limit = 10, page = 1 } = req.query;
    const data = await jobsService.getListingByPostcodeAndRadius(user.id, postcode, mile, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.searchListings = async (req, res) => {
  try {
    const user = req.user;
    const { keyword, limit = 10, page = 1 } = req.query;
    const data = await jobsService.searchListing(user.id, keyword, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};
exports.searchListingsNew = async (req, res) => {
  try {
    const user = req.user;
    const { keyword, category, postcode, mile, limit = 10, page = 1 } = req.query;
    const data = await jobsService.searchListingNew(user.id, keyword, category, postcode, mile, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};
exports.searchListingsbyCategory = async (req, res) => {
  try {
    const user = req.user;
    const { keyword, limit = 10, page = 1 } = req.query;
    const { category_id } = req.params;
    const data = await jobsService.searchListingbyCategory(user.id, category_id, keyword, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.searchListingByPostcodeAndRadius = async (req, res) => {
  try {
    const user = req.user;
    const { keyword, postcode, mile = 10, limit = 10, page = 1 } = req.query;
    const data = await jobsService.searchListingByPostcodeAndRadius(user.id, postcode, mile, keyword, page, limit);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Qualifications
exports.getQualifications = async (req, res) => {
  try {
    const data = await jobQualificationService.getAllQualifications();
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Qualifications Categories
exports.getQualificationCategories = async (req, res) => {
  try {
    const data = await jobQualificationService.getAllQualificationCategories();
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Qualifications by Category
exports.getQualificationbyCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await jobQualificationService.getQualificationsbyCategory(id);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// İlanı takip eder.
exports.doFollow = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await UserFollowJobService.doFollowJob(user.id, id);
    return response.success(res, []);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// İlanı takipten çıkarır.
exports.deleteFollow = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await UserFollowJobService.deleteFollowJob(user.id, id);
    return response.success(res, []);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// İlgilenmiyor olarak işaretler.
exports.notInterested = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await UserFollowJobService.notInterested(user.id, id);
    return response.success(res, []);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

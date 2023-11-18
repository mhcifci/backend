const response = require("../interceptors/response.interceptor");
const Jobs = require("../services/jobs.service");
const JobsCategories = require("../services/jobsCategories.service");

// Start Class
const jobsService = new Jobs();
const jobsCategoriesService = new JobsCategories();

exports.getAll = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await jobsService.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const result = await jobsService.getJobsDetail(user.id, id);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const user = req.user;
    const result = await jobsService.createJob(user.id, {
      category_id: req.body.category_id,
      description: req.body.description,
      country: req.body.country,
      is_active: false,
    });
    return response.success(res, result, "Jobs created successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// All
exports.getJobsCategories = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await jobsCategoriesService.getAllWithPagination(page, limit);
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

// Single category information
exports.getJobsCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await jobsCategoriesService.getById(parseInt(id));
    return response.success(res, result);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getJobsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const result = await jobsService.getJobsbyCategory(parseInt(page), parseInt(limit), parseInt(id));
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
    return response.success(res, result, "Jobs opened successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

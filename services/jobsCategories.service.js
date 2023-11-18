const { Op } = require("sequelize");
const BaseService = require("./base.service");
const JobsCategories = require("../models/jobsCategories.model");

class JobsCategoriesService extends BaseService {
  constructor() {
    super(JobsCategories);
  }
}

module.exports = JobsCategoriesService;

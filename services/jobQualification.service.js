require("../models/associations/jobQualification.model");
const BaseService = require("./base.service");
const JobQualification = require("../models/jobQualifications.model");
const jobQualificationCategories = require("../models/jobQualificationCategories.model");

class JobQualificationService extends BaseService {
  constructor() {
    super(JobQualification);
  }
  async getAllQualifications() {
    return await JobQualification.findAll({
      include: jobQualificationCategories,
    });
  }
  async getAllQualificationCategories() {
    return await jobQualificationCategories.findAll();
  }
  async getQualificationsbyCategory(category_id) {
    return await jobQualificationCategories.findAll(
      {
        include: JobQualification,
      },
      { where: { category_id: parseInt(category_id) } }
    );
  }
}

module.exports = JobQualificationService;

require("../models/associations/jobQualification.model");
const BaseService = require("./base.service");
const jobHaveQualifications = require("../models/jobHaveQualifications.model");

class JobHaveQualificationService extends BaseService {
  constructor() {
    super(jobHaveQualifications);
  }
}

module.exports = JobHaveQualificationService;

const BaseService = require("./base.service");
const UserOpenedJobs = require("../models/userOpenedJobs.model");

class UserOpenedJobsService extends BaseService {
  constructor() {
    super(UserOpenedJobs);
  }
}

module.exports = UserOpenedJobsService;

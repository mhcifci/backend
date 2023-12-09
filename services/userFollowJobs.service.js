const BaseService = require("./base.service");
const userFollowJobs = require("../models/userFollowJobs.model");

class userFollowJobsService extends BaseService {
  constructor() {
    super(userFollowJobs);
  }

  async getUserFollowListings(user_id) {
    const list = await this.getAll({
      where: {
        user_id,
      },
    });
    return list;
  }

  // Jobs'u takip eder
  async doFollowJob(user_id, job_id) {
    const item = await this.getWithCondition({
      user_id: parseInt(user_id),
      job_id: parseInt(job_id),
    });
    if (!item) {
      return await this.create({
        user_id: parseInt(user_id),
        job_id: parseInt(job_id),
        is_following: true,
      });
    }
    return await item.update({
      is_following: true,
    });
  }

  // Jobs'u takipten çıkarır
  async deleteFollowJob(user_id, job_id) {
    // find
    const item = await this.getWithCondition({
      user_id: parseInt(user_id),
      job_id: parseInt(job_id),
    });
    if (!item) throw new Error("You are not following this listing.");
    await this.delete(item.id);
    return true;
  }

  // mark not interested
  async notInterested(user_id, job_id) {
    // find
    const item = await this.getWithCondition({
      user_id: parseInt(user_id),
      job_id: parseInt(job_id),
    });
    if (!item) {
      return await this.create({
        user_id: parseInt(user_id),
        job_id: parseInt(job_id),
        is_following: false,
      });
    }
    return await item.update({
      is_following: false,
    });
  }
}

module.exports = userFollowJobsService;

require("../models/associations/userOpenedListings.model");
const { Op } = require("sequelize");
const BaseService = require("./base.service");

const userOpenedListings = require("../models/userOpenedListings.model");
const userOpenedJobs = require("../models/userOpenedJobs.model");
const User = require("../models/user.model");
const Listings = require("../models/listing.model");
const Jobs = require("../models/jobs.model");
const UserTransactions = require("../models/userTransactions.model");

class ReportService extends BaseService {
  constructor() {
    super();
  }

  async getUnlockedContactReports(user_id, page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const listings = await userOpenedListings.findAndCountAll({
      where: {
        user_id: parseInt(user_id),
      },
      include: [
        {
          model: Listings,
        },
        {
          model: User,
        },
        {
          model: UserTransactions,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    const jobs = await userOpenedJobs.findAndCountAll({
      where: {
        user_id: parseInt(user_id),
      },
      include: [
        {
          model: Jobs,
        },
        {
          model: User,
        },
        {
          model: UserTransactions,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    return {
      listings: listings.count > 0 ? listings.rows : [],
      jobs: jobs.count > 0 ? jobs.rows : [],
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }
}

module.exports = ReportService;

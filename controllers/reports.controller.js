const response = require("../interceptors/response.interceptor");
const Report = require("../services/report.service");

// Start Class
const ReportService = new Report();

exports.getAll = async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, page = 1 } = req.query;

    const result = await ReportService.getUnlockedContactReports(user.id, page, limit);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

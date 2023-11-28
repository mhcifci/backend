const response = require("../interceptors/response.interceptor");
const PostCodes = require("../services/postCodes.service");

// Start Class
const PostCodesService = new PostCodes();

exports.autoComplete = async (req, res) => {
  try {
    const { code } = req.query;
    const result = await PostCodesService.autoCompletePostcode(code);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

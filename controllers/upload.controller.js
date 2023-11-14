const response = require("../interceptors/response.interceptor");
const Listing = require("../services/listing.service");

const uuid = require("uuid");
const path = require("path");
const uploadService = require("../services/upload.service");

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const result = await Listing.getListingDetail(user.id, id);
    return response.success(res, result);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const user = req.user;
    const fileExtension = path.extname(req.file.originalname);
    const fileName = user.id + "_" + uuid.v4() + fileExtension;
    const data = await uploadService.uploadFile("/", req.file.buffer, fileName, user.id, null);

    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

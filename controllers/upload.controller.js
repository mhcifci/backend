const response = require("../interceptors/response.interceptor");

const uuid = require("uuid");
const path = require("path");

const Upload = require("../services/upload.service");

// Start Class
const uploadService = new Upload();

exports.create = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("File is required.");
    }

    const user = req.user;
    const fileExtension = path.extname(req.file.originalname);
    const fileName = user.id + "_" + uuid.v4() + fileExtension;
    const data = await uploadService.uploadFile("/", req.file.buffer, fileName, parseInt(user.id), null);

    return response.success(res, data);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.createForNotMember = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("File is required.");
    }

    const fileExtension = path.extname(req.file.originalname);
    let fileName;
    if (req.user) {
      fileName = user.id + "_" + uuid.v4() + fileExtension;
    } else {
      fileName = "_" + uuid.v4() + fileExtension;
    }
    const data = await uploadService.uploadFile("/", req.file.buffer, fileName, null, null);

    return response.success(res, data);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

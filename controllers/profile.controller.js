const response = require("../interceptors/response.interceptor");
const User = require("../services/user.service");
const UserDetails = require("../services/userDetails.service");
const uploadService = require("../services/upload.service");
const uuid = require("uuid");
const path = require("path");
// Change profile picture controller.
exports.changeProfilePicture = async (req, res) => {
  try {
    const user = req.user;

    const fileExtension = path.extname(req.file.originalname);
    const fileName = user.id + "_" + uuid.v4() + fileExtension;
    const upload = await uploadService.uploadFile("/", req.file.buffer, fileName, user.id, "Profile picture.");
    const data = await UserDetails.changeProfilePicture(user, upload);
    return response.success(res, data);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.getProfileInformation = async (req, res) => {
  try {
    const user = req.user;
    const data = await User.getUserDetails(user.id);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

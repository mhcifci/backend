const response = require("../interceptors/response.interceptor");
const User = require("../services/user.service");
const UserDetails = require("../services/userDetails.service");
const Upload = require("../services/upload.service");
const uuid = require("uuid");
const path = require("path");

// Start Class
const uploadService = new Upload();
const UserDetailsService = new UserDetails();
const UserService = new User();

// Change profile picture controller.
exports.changeProfilePicture = async (req, res) => {
  try {
    const user = req.user;

    const fileExtension = path.extname(req.file.originalname);
    const fileName = user.id + "_" + uuid.v4() + fileExtension;
    const upload = await uploadService.uploadFile("/", req.file.buffer, fileName, user.id, "Profile picture.");
    const data = await UserDetailsService.changeProfilePicture(user, upload);
    return response.success(res, data);
  } catch (err) {
    console.log(err);
    return response.badRequest(res, err.message);
  }
};

exports.getProfileInformation = async (req, res) => {
  try {
    const user = req.user;
    const data = await UserService.getUserDetails(user.id);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};
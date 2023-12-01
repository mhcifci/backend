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

exports.changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { old_password, new_password } = req.body;
    const data = await UserService.changePassword(user.id, old_password, new_password);
    return response.success(res, data, "Password changed successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { old_password, new_password } = req.body;
    const data = await UserService.changePassword(user.id, old_password, new_password);
    return response.success(res, data, "Password changed successfully.");
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getPreferences = async (req, res) => {
  try {
    const user = req.user;
    const data = await UserDetailsService.getUserPreferences(parseInt(user.id));
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const user = req.user;
    const { preffered_post_code, preffered_max_mile } = req.body;
    console.log(preffered_max_mile, preffered_post_code);
    const data = await UserDetailsService.updateUserPreffereds(parseInt(user.id), preffered_post_code, preffered_max_mile);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.setUserType = async (req, res) => {
  try {
    const user = req.user;
    const { type_of_user } = req.params;
    const data = await UserDetailsService.setUserType(parseInt(user.id), type_of_user);
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

exports.getAllUserTypes = async (req, res) => {
  try {
    const data = await UserDetailsService.getUserTypes();
    return response.success(res, data);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

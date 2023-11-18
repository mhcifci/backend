const BaseService = require("./base.service");
const UserDetails = require("../models/userDetails.model");
const Upload = require("./upload.service");
const UserUploadedFiles = require("./userUploadedFiles.service");

// Start Class
const uploadService = new Upload();
const UserUploadedFilesService = new UserUploadedFiles();

class UserDetailsService extends BaseService {
  constructor() {
    super(UserDetails);
  }

  async changeProfilePicture(user, data) {
    const existingUserDetails = await this.getWithCondition({
      user_id: parseInt(user.id),
    });

    if (existingUserDetails) {
      return await this.update(existingUserDetails.id, {
        img_id: data.id,
      });
    } else {
      return await this.create({
        user_id: parseInt(user.id),
        img_id: data.id,
      });
    }
  }

  async getProfilePicture(user) {
    const existingUserDetails = await this.getWithCondition({
      user_id: parseInt(user.id),
    });

    if (existingUserDetails) {
      return await UserUploadedFilesService.getFileUrl(existingUserDetails.img_id);
    } else {
      return null;
    }
  }
}

module.exports = UserDetailsService;

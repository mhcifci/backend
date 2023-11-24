const BaseService = require("./base.service");
const UserDetails = require("../models/userDetails.model");
const UserUploadedFiles = require("./userUploadedFiles.service");

// Start Class
const UserUploadedFilesService = new UserUploadedFiles();

class UserDetailsService extends BaseService {
  constructor() {
    super(UserDetails);
  }

  /**
   *
   * @param {user_id} user
   * @returns preffered_post_code: (string) and preffered_max_mile: (int)
   */
  async getUserPreferences(user_id) {
    const existingUserDetails = await this.getWithCondition({
      user_id: parseInt(user_id),
    });

    if (existingUserDetails) {
      return {
        preffered_post_code: existingUserDetails.preffered_post_code,
        preffered_max_mile: existingUserDetails.preffered_max_mile,
      };
    } else {
      return {
        preffered_post_code: null,
        preffered_max_mile: null,
      };
    }
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

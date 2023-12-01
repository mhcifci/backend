require("../models/associations/userTypes.model");
const UserType = require("../models/userTypes.model");

const BaseService = require("./base.service");
const UserDetails = require("../models/userDetails.model");
const UserUploadedFiles = require("./userUploadedFiles.service");
const PostCodes = require("./postCodes.service");
const UserTypes = require("./userTypes.service");

// Start Class
const UserUploadedFilesService = new UserUploadedFiles();
const PostCodesService = new PostCodes();
const UserTypesService = new UserTypes();

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

  async getUserType(user_id) {
    const userType = await this.model.findOne({
      where: {
        user_id: parseInt(user_id),
      },
      include: [
        {
          model: UserType,
          attributes: ["id", "title", "description"],
        },
      ],
    });
    console.log(userType);
    return userType;
  }

  // return all user types
  async getUserTypes() {
    return await UserTypesService.getAll();
  }

  async setUserType(user_id, type_of_user) {
    const existingUserDetails = await this.getWithCondition({
      user_id: parseInt(user_id),
    });

    // check type is valid
    const checkUserTypes = await UserTypesService.getById(parseInt(type_of_user));
    if (!checkUserTypes) throw new Error("Invalid user type.");

    return await this.update(existingUserDetails.id, {
      type_of_user: checkUserTypes.id,
    });
  }

  async updateUserPreffereds(user_id, preffered_post_code, preffered_max_mile) {
    const existingUserDetails = await this.getWithCondition({
      user_id: parseInt(user_id),
    });

    // Önce post code'un geçerliliği kontrol edilecek.
    const postCode = await PostCodesService.validatePostcode(preffered_post_code);
    // Eğer geçerli değilse hata döndürülecek.
    if (!postCode) throw new Error("Invalid post code.");
    // Eğer max mile 0'dan küçükse hata döndürülecek.
    if (preffered_max_mile < 0) throw new Error("Invalid max mile.");

    if (existingUserDetails) {
      return await this.update(existingUserDetails.id, {
        preffered_post_code: preffered_post_code,
        preffered_max_mile: preffered_max_mile,
      });
    } else {
      return await this.create({
        user_id: parseInt(user_id),
        preffered_post_code: preffered_post_code,
        preffered_max_mile: preffered_max_mile,
      });
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

const BaseService = require("./base.service");
const UserDetails = require("../models/userDetails.model");
const Upload = require("./upload.service");

// Start Class
const uploadService = new Upload();

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
      const image = await uploadService.getById(existingUserDetails.img_id);
      console.log(image);
      return image;
    } else {
      return null;
    }
  }
}

module.exports = UserDetailsService;

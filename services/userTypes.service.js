const BaseService = require("./base.service");
const UserTypes = require("../models/userTypes.model");

class UserTypesService extends BaseService {
  constructor() {
    super(UserTypes);
  }
}

module.exports = UserTypesService;

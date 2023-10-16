const Announcements = require("../../models/Announcements");
const BaseService = require("../BaseService");

class AnnouncementsService extends BaseService {
  constructor() {
    super(Announcements);
  }
}

module.exports = new AnnouncementsService();

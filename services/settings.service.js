const { DataException, AlreadyException } = require('../exceptions/SaleExceptions');

require("../models/associations/salesCategories.model");


const BaseService = require("./base.service");
const Settings = require("../models/settings.model");

class SettingsService extends BaseService {
  constructor() {
    super(Settings);
  }


  async getSalesLogo() {
    const item = await Settings.findOne({
      where: { id: 1 },
    });

    
    return item.sales_logo;
  }






}

module.exports = SettingsService;

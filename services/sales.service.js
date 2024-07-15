require("../models/associations/salesCategories.model");


const BaseService = require("./base.service");
const SalesCategories = require("../models/salesCategories.model");
const SalesCategoryItems = require("../models/salesCategoryItems.model");

class SalesService extends BaseService {
  constructor() {
    super(SalesCategories);
  }


  async getAllCategoriesWithItems() {
    const items = await this.model.findAll({
      where: {is_active: 1},
      attributes: ["id","title","description", "description"],
      include: [
        {
          where : {is_active: 1},
          model: SalesCategoryItems,
          as: "sales_category_items",
          attributes: ["id","title"],
        },
        
      ],

    });
    return items;
  }
}

module.exports = SalesService;

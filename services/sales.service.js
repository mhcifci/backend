require("../models/associations/salesCategories.model");


const BaseService = require("./base.service");
const Sales = require("../models/sales.model");
const SalesOrderDetails = require("../models/salesOrderDetails.model");
const SalesCategories = require("../models/salesCategories.model");
const SalesCategoryItems = require("../models/salesCategoryItems.model");

class SalesService extends BaseService {
  constructor() {
    super(SalesCategories);
  }


  // Kategori item'ı varsa bunu döndürecek.
  async checkIfCategoryItemExists(id) {
    const item = await SalesCategoryItems.findOne({
      where: { id },
    });
    return item;
  }


  async checkUserHasActiveOrder(user) {
    const order = await Sales.findOne({
      where: { user_id: user, is_active: 1 },
    });
    return order;
  }


  async createSalesOrder(user, items_detail, additional_notes) {


    // items_detail array olmalı
    if (!Array.isArray(items_detail)) {
      throw new Error("Item ids must be an array");
    }

    // items_detail array'inin içinde en az 1 item olmalı
    if (items_detail.length < 1) {
      throw new Error("Item ids must be at least 1");
    } 


    // Kullanıcının aktif siparişi var mı?
    const userHasActiveOrder = await this.checkUserHasActiveOrder(user);

    if (userHasActiveOrder) {
      throw new Error("You already have an active order");
    }

   // Sales'da bir sipariş oluşturuyoruz.
    const sales = await Sales.create({
      user_id: user,
      additional_notes,
    });


    for (let i = 0; i < items_detail.length; i++) {
      const item = items_detail[i];

      // item'da id ve quantity olmalı.
      if (!item.id || !item.quantity) {
        throw new Error("Item id and quantity are required");
      }

      // item'ın id'si var mı kontrol ediyoruz.
      const itemExists = await this.checkIfCategoryItemExists(item.id);

      if (!itemExists) {
        throw new Error(`Item with id ${item.id} does not exist`);
      }

      // item'ın quantity'si 0'dan büyük olmalı.
      if (item.quantity < 1) {
        throw new Error("Quantity must be greater than 0");
      }

      // SalesOrderDetails tablosuna item'ı ekliyoruz.
      await SalesOrderDetails.create({
        sales_id: sales.id,
        item_id: item.id,
        quantity: item.quantity
      });

    }
    return sales;
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

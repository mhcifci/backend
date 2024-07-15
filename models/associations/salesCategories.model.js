const SalesCategories = require("../salesCategories.model");
const SalesItems = require("../salesCategoryItems.model");

SalesCategories.hasMany(SalesItems, { foreignKey: "category_id" });
SalesItems.belongsTo(SalesCategories, { foreignKey: "category_id" });
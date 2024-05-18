const Users = require("../user.model");
const AppleOrders = require("../appleOrders.model");
const Products = require("../appleProducts.model");

// Bir kullanıcının birden fazla siparişi olabilir
Users.hasMany(AppleOrders, { foreignKey: "user_id" });

// Bir sipariş yalnızca bir kullanıcıya ait olabilir
AppleOrders.belongsTo(Users, { foreignKey: "user_id" });

// Bir sipariş yalnızca bir pakete ait olabilir
AppleOrders.belongsTo(Products, { foreignKey: "product_id" });

// Bir paket birden fazla siparişe ait olabilir
Products.hasMany(AppleOrders, { foreignKey: "product_id" });

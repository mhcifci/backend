const Users = require("../user.model");
const Orders = require("../orders.model");
const Packages = require("../packages.model");

// Bir kullanıcının birden fazla siparişi olabilir
Users.hasMany(Orders, { foreignKey: "user_id" });

// Bir sipariş yalnızca bir kullanıcıya ait olabilir
Orders.belongsTo(Users, { foreignKey: "user_id" });

// Bir sipariş yalnızca bir pakete ait olabilir
Orders.belongsTo(Packages, { foreignKey: "package_id" });

// Bir paket birden fazla siparişe ait olabilir
Packages.hasMany(Orders, { foreignKey: "package_id" });

const UserTypes = require("../userTypes.model");
const UserDetails = require("../userDetails.model");

// UserDetails'de type_of_user olarak her userin bir type'ı olabilir bu da usertypes'daki id ile eşleşir
UserTypes.hasMany(UserDetails, { foreignKey: "type_of_user" });
UserDetails.belongsTo(UserTypes, { foreignKey: "type_of_user" });

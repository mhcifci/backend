const ListingIncludeFiles = require("../listingIncludeFiles.model");
const UserUploadedFiles = require("../userUploadedFiles.model");

UserUploadedFiles.hasMany(ListingIncludeFiles, { foreignKey: "file_id" });
ListingIncludeFiles.belongsTo(UserUploadedFiles, { foreignKey: "file_id" });

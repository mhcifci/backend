const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const DesignIncludeFiles = sequelize.define(
  "design_draft_include_files",
  {
    listing_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    file_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "design_draft_include_files" }
);

module.exports = DesignIncludeFiles;

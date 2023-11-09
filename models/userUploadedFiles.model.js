const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const UserUploadedFiles = sequelize.define(
  "user_uploaded_files",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    file_url: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 255,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      max: 255,
    },
  },
  { timestamps: true, underscored: true, tableName: "user_uploaded_files" }
);

module.exports = UserUploadedFiles;

require("dotenv").config();

const Sequelize = require("sequelize");

const environment = process.env.ENVIRONMENT || "development";

const config = {
  development: {
    username: process.env.DEVELOPMENT_MYSQL_USER || "mahmut",
    password: process.env.DEVELOPMENT_MYSQL_PASSWORD || "2146422Mahmut",
    database: process.env.DEVELOPMENT_MYSQL_DATABASE || "sdl_application",
    host: process.env.DEVELOPMENT_MYSQL_HOST || "localhost",
    port: process.env.DEVELOPMENT_MYSQL_PORT || 3306,
    dialect: "mysql",
  },
  test: {},
  production: {},
};

const sequelize = new Sequelize(config[environment]);

module.exports = sequelize;

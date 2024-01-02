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
  test: {
    username: process.env.TEST_MYSQL_USER || "mahmut",
    password: process.env.TEST_MYSQL_PASSWORD || "2146422Mahmut",
    database: process.env.TEST_MYSQL_DATABASE || "sdl_application",
    host: process.env.TEST_MYSQL_HOST || "localhost",
    port: process.env.TEST_MYSQL_PORT || 3306,
    dialect: "mysql",
  },
  production: {
    username: process.env.PRODUCTION_MYSQL_USER || "mahmut",
    password: process.env.PRODUCTION_MYSQL_PASSWORD || "2146422Mahmut",
    database: process.env.PRODUCTION_MYSQL_DATABASE || "sdl_application",
    host: process.env.PRODUCTION_MYSQL_HOST || "localhost",
    port: process.env.PRODUCTION_MYSQL_PORT || 3306,
    dialect: "mysql",
  },
};

const sequelize = new Sequelize(config[environment]);

module.exports = sequelize;

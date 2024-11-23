const mysql = require("mysql2");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "9384776379@Sa", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

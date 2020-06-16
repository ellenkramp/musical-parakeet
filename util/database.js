const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Lsx510@10a", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

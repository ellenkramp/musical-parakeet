const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "Lsx510@10a",
});

module.exports = pool.promise();

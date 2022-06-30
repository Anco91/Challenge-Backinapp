const mysql2 = require('mysql2');
require('dotenv').config();

var con = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT
});

con.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected !",  process.env.DB_HOST);
});

module.exports = {
    con
}

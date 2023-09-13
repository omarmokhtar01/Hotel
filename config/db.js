const mysql = require('mysql2/promise')

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database:process.env.DATABASE,
  port:process.env.PORT_SQL,
      })
      
module.exports = db

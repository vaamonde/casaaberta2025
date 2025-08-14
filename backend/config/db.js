// backend/config/db.js
require('dotenv').config()
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306
})

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err)
  } else {
    console.log('Conectado ao MySQL')
  }
})

module.exports = connection.promise()

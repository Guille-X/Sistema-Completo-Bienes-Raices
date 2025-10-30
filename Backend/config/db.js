const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'bienesr',
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = db;

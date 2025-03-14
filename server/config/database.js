const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// Veritabanı oluşturma fonksiyonu
async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  console.log('Veritabanı kontrol edildi veya oluşturuldu.');
  await connection.end();
}

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DIALECT
});

(async () => {
  try {
    await createDatabase();
    await sequelize.authenticate();
    console.log('MySQL veritabanına bağlanıldı.');

    await sequelize.sync({ alter: true });
    console.log('Tablolar senkronize edildi.');
  } catch (error) {
    console.error('Veritabanı hatası:', error);
  }
})();

module.exports = sequelize;

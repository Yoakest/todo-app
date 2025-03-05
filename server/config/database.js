const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// PostgreSQL bağlantısı için ayarlar
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,
    dialect: 'mysql',
});

module.exports = sequelize;

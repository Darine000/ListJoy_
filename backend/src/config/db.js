const { Sequelize } = require('sequelize');
require('dotenv').config();

// Подключение к SQL базе
const sequelize = new Sequelize(
  process.env.DB_NAME, // Имя базы
  process.env.DB_USER, // Имя пользователя
  process.env.DB_PASSWORD, // Пароль
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', // Для MySQL

  }
);

// Проверка подключения
sequelize.authenticate()
  .then(() => console.log('Connected to SQL database'))
  .catch(err => console.error('Unable to connect:', err));

module.exports = sequelize;
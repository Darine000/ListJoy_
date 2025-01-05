const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ShoppingList = require('./shoppingList'); // Убедитесь, что путь корректный

// Определение модели ListItem
const ListItem = sequelize.define('ListItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Определение связи с ShoppingList
ListItem.belongsTo(ShoppingList, { foreignKey: 'listId', onDelete: 'CASCADE' });

// Экспорт модели
module.exports = ListItem;
const ShoppingListSQL = require('./shoppingListDB');
const ShoppingListMongo = require('./shoppingListDB.mongo');

const useMongoDB = process.env.USE_MONGO === 'true'; // Переключение через .env

const ShoppingListService = useMongoDB ? ShoppingListMongo : ShoppingListSQL;

module.exports = ShoppingListService;
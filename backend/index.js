const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./src/config/db"); // Подключение к MySQL
const mongoose = require("./src/config/mongodb"); // Подключение к MongoDB
const shoppingListRoutes = require("./src/controllers/shoppingListController");
const { errorHandler } = require("./src/utils/errorHandler"); // Глобальная обработка ошибок
const ShoppingList = require("./src/models/shoppingList");
const ListItem = require("./src/models/ListItem");
const User = require("./src/models/User");

const app = express();

// Middleware
app.use(bodyParser.json());

// Настройка связей между моделями
ShoppingList.hasMany(ListItem, { foreignKey: "listId", onDelete: "CASCADE" });
ListItem.belongsTo(ShoppingList, { foreignKey: "listId" });

ShoppingList.belongsTo(User, { foreignKey: "ownerId", onDelete: "CASCADE" });
User.hasMany(ShoppingList, { foreignKey: "ownerId" });

// Синхронизация базы данных MySQL
if (process.env.USE_MONGO !== "true") {
  sequelize
    .sync({ force: false }) // Измените на `true` для пересоздания таблиц при каждом запуске
    .then(() => console.log("MySQL database synchronized"))
    .catch((err) => console.error("Error synchronizing MySQL database:", err));
}

// MongoDB подключение
if (process.env.USE_MONGO === "true") {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// Routes
app.use("/api/shopping-lists", shoppingListRoutes);

// Global error handler
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
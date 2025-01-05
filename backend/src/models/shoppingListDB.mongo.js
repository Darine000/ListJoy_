const ShoppingListMongo = require('./shoppingListDB.mongo'); // MongoDB модель

class ShoppingListDB {
  static async getAll() {
    return await ShoppingListMongo.find(); // Все списки
  }

  static async getById(id) {
    return await ShoppingListMongo.findById(id); // Поиск по ID
  }

  static async create({ name, owner, items = [] }) {
    if (!name || typeof name !== "string") {
      throw new Error("Invalid name");
    }
    if (!owner || typeof owner !== "string") {
      throw new Error("Invalid owner");
    }

    const newShoppingList = new ShoppingListMongo({ name, owner, items });
    return await newShoppingList.save(); // Сохранение
  }

  static async update(id, updates) {
    return await ShoppingListMongo.findByIdAndUpdate(id, updates, { new: true }); // Обновление
  }

  static async delete(id) {
    const result = await ShoppingListMongo.findByIdAndDelete(id); // Удаление
    return !!result;
  }

  static async archive(id) {
    const shoppingList = await ShoppingListMongo.findById(id);
    if (!shoppingList) return null;

    shoppingList.archived = !shoppingList.archived;
    return await shoppingList.save();
  }

  static async getArchived() {
    return await ShoppingListMongo.find({ archived: true }); // Архивированные списки
  }
}

module.exports = ShoppingListDB;
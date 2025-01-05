const ShoppingListSQL = require('./shoppingList'); // SQL модель

class ShoppingListDB {
  static async getAll() {
    return await ShoppingListSQL.findAll(); // Получение всех списков
  }

  static async getById(id) {
    return await ShoppingListSQL.findByPk(id); // Поиск по ID
  }

  static async create({ name, owner, items = [] }) {
    if (!name || typeof name !== "string") {
      throw new Error("Invalid name");
    }
    if (!owner || typeof owner !== "string") {
      throw new Error("Invalid owner");
    }

    const newShoppingList = await ShoppingListSQL.create({ name, owner }); // Создание списка
    return newShoppingList;
  }

  static async update(id, updates) {
    const shoppingList = await ShoppingListSQL.findByPk(id);
    if (!shoppingList) return null;

    await shoppingList.update(updates); // Обновление
    return shoppingList;
  }

  static async delete(id) {
    const deletedCount = await ShoppingListSQL.destroy({ where: { id } }); // Удаление
    return deletedCount > 0;
  }

  static async archive(id) {
    const shoppingList = await ShoppingListSQL.findByPk(id);
    if (!shoppingList) return null;

    shoppingList.archived = !shoppingList.archived;
    await shoppingList.save();
    return shoppingList;
  }

  static async getArchived() {
    return await ShoppingListSQL.findAll({ where: { archived: true } }); // Архивированные списки
  }
}

module.exports = ShoppingListDB;
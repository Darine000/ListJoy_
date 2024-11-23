let shoppingLists = [];

class ShoppingList {
  static getAll() {
    return shoppingLists;
  }

  static getById(id) {
    return shoppingLists.find((list) => list.id === id);
  }

  static create({ name, items }) {
    const newShoppingList = { id: Date.now().toString(), name, items: items || [] };
    shoppingLists.push(newShoppingList);
    return newShoppingList;
  }

  static update(id, updates) {
    const index = shoppingLists.findIndex((list) => list.id === id);
    if (index === -1) return null;
    shoppingLists[index] = { ...shoppingLists[index], ...updates };
    return shoppingLists[index];
  }

  static delete(id) {
    const index = shoppingLists.findIndex((list) => list.id === id);
    if (index === -1) return false;
    shoppingLists.splice(index, 1);
    return true;
  }
}

module.exports = ShoppingList;

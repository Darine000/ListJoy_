const shoppingLists = [
  {
    id: "1",
    name: "BILLA",
    owner: "u1",
    members: ["u2", "u3"],
    items: [
      { id: "i1", name: "Mléko", resolved: false },
      { id: "i2", name: "Chléb", resolved: true },
    ],
    archived: false,
  },
  {
    id: "2",
    name: "LIDL",
    owner: "u2",
    members: ["u1", "u3"],
    items: [
      { id: "i3", name: "Máslo", resolved: false },
      { id: "i4", name: "Sýr", resolved: true },
    ],
    archived: false,
  },
];

class ShoppingList {
  static getAll() {
    return shoppingLists;
  }

  static getById(id) {
    return shoppingLists.find((list) => list.id === id);
  }

  static create({ name, owner, items = [] }) {
    if (!name || typeof name !== "string") {
      throw new Error("Invalid name");
    }
    if (!owner || typeof owner !== "string") {
      throw new Error("Invalid owner");
    }
    if (!Array.isArray(items)) {
      throw new Error("Items must be an array");
    }

    const newShoppingList = {
      id: Date.now().toString(),
      name,
      owner,
      members: [owner],
      items,
      archived: false,
    };
    shoppingLists.push(newShoppingList);
    return newShoppingList;
  }

  static update(id, updates) {
    const index = shoppingLists.findIndex((list) => list.id === id);
    if (index === -1) return null;

    if (updates.name && typeof updates.name !== "string") {
      throw new Error("Invalid name");
    }
    if (updates.items && !Array.isArray(updates.items)) {
      throw new Error("Items must be an array");
    }

    shoppingLists[index] = { ...shoppingLists[index], ...updates };
    return shoppingLists[index];
  }

  static delete(id) {
    const index = shoppingLists.findIndex((list) => list.id === id);
    if (index === -1) return false;
    shoppingLists.splice(index, 1);
    return true;
  }

static archive(id) {
  const shoppingList = this.getById(id); // Ищем список по ID
  if (!shoppingList) {
    return null; // Если список не найден
  }

  shoppingList.archived = !shoppingList.archived; // Меняем статус архивации
  return shoppingList; // Возвращаем обновлённый список
}

  static getArchived() {
    return shoppingLists.filter((list) => list.archived);
  }
}

module.exports = ShoppingList;
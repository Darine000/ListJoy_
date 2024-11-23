const ShoppingList = require("../models/shoppingList");

exports.getShoppingLists = (req, res) => {
  const shoppingLists = ShoppingList.getAll();
  res.status(200).json({ shoppingLists });
};

exports.getShoppingListById = (req, res) => {
  const { id } = req.params;
  const shoppingList = ShoppingList.getById(id);
  if (!shoppingList) {
    return res.status(404).json({ error: "Shopping list not found" });
  }
  res.status(200).json({ shoppingList });
};

exports.createShoppingList = (req, res) => {
  const { name, items } = req.body;
  const newShoppingList = ShoppingList.create({ name, items });
  res.status(201).json({ shoppingList: newShoppingList });
};

exports.updateShoppingList = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedShoppingList = ShoppingList.update(id, updates);
  if (!updatedShoppingList) {
    return res.status(404).json({ error: "Shopping list not found" });
  }
  res.status(200).json({ shoppingList: updatedShoppingList });
};

exports.deleteShoppingList = (req, res) => {
  const { id } = req.params;
  const success = ShoppingList.delete(id);
  if (!success) {
    return res.status(404).json({ error: "Shopping list not found" });
  }
  res.status(204).send();
};

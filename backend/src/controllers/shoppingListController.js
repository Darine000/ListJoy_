const ShoppingList = require("../models/shoppingList");

exports.getShoppingLists = async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.getAll();
    res.status(200).json({ shoppingLists });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shopping lists", details: error.message });
  }
};

exports.getShoppingListById = async (req, res) => {
  const { id } = req.params;
  try {
    const shoppingList = await ShoppingList.getById(id);
    if (!shoppingList) {
      return res.status(404).json({ error: "Shopping list not found" });
    }
    res.status(200).json({ shoppingList });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shopping list", details: error.message });
  }
};

exports.createShoppingList = async (req, res) => {
  const { name, items } = req.body;

  console.log("Incoming request body:", req.body);

  if (!name || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const newShoppingList = ShoppingList.create({
      name,
      owner: req.userProfile,
      items,
    });

    console.log("New shopping list created:", newShoppingList);
    return res.status(201).json({ shoppingList: newShoppingList });
  } catch (error) {
    console.error("Error creating shopping list:", error.message);
    return res.status(500).json({ error: "Failed to create shopping list", details: error.message });
  }
};

exports.updateShoppingList = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {

    const shoppingList = ShoppingList.getById(id);
    if (!shoppingList) {
      return res.status(404).json({ error: "Shopping list not found" });
    }


    if (updates.items && Array.isArray(updates.items)) {
      updates.items = updates.items.map(String);
    }


    const updatedShoppingList = ShoppingList.update(id, updates);
    res.status(200).json({ shoppingList: updatedShoppingList });
  } catch (error) {
    res.status(500).json({ error: "Failed to update shopping list", details: error.message });
  }
};

exports.deleteShoppingList = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const success = ShoppingList.delete(id);

    if (!success) {
      return res.status(404).json({ error: "Shopping list not found" });
    }

    res.status(200).json({ message: "Shopping list successfully deleted" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete shopping list",
      details: error.message,
    });
  }
};

exports.archiveShoppingList = (req, res) => {
  const { id } = req.params;


  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {

    const updatedShoppingList = ShoppingList.archive(id);


    if (!updatedShoppingList) {
      return res.status(404).json({ error: "Shopping list not found" });
    }


    res.status(200).json({ shoppingList: updatedShoppingList });
  } catch (error) {
    res.status(500).json({
      error: "Failed to archive shopping list",
      details: error.message,
    });
  }
};
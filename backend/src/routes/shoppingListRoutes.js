const express = require("express");
const {
  getShoppingLists,
  getShoppingListById,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} = require("../controllers/shoppingListController");
const { validateDto } = require("../middlewares/validationMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getShoppingLists);
router.get("/:id", authMiddleware, getShoppingListById);
router.post("/", authMiddleware, validateDto("createList"), createShoppingList);
router.put("/:id", authMiddleware, validateDto("updateList"), updateShoppingList);
router.delete("/:id", authMiddleware, deleteShoppingList);

module.exports = router;

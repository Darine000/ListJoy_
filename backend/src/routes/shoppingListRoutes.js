const express = require("express");
const {
  getShoppingLists,
  getShoppingListById,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  archiveShoppingList, 
} = require("../controllers/shoppingListController");
const { validateDto } = require("../middlewares/validationMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const ShoppingList = require("../models/shoppingList"); 

const router = express.Router();


router.get("/", authMiddleware, getShoppingLists);

router.post("/", authMiddleware, validateDto("createList"), createShoppingList);
router.put("/:id", authMiddleware, validateDto("updateList"), updateShoppingList);
router.delete("/:id", authMiddleware, deleteShoppingList);


router.patch("/:id/archive", authMiddleware, archiveShoppingList);


console.log("Imported ShoppingList:", ShoppingList);

router.get("/archived", authMiddleware, (req, res) => {
  try {
    const archivedLists = ShoppingList.getArchived();
    res.status(200).json({ shoppingLists: archivedLists });
  } catch (error) {
    console.error("Error while fetching archived lists:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});
router.get("/:id", authMiddleware, getShoppingListById);

module.exports = router;
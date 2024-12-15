let mockShoppingLists;

beforeEach(() => {
  mockShoppingLists = [
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
});

const ShoppingList = require("../models/shoppingList");

jest.mock("../models/shoppingList", () => ({
  getAll: jest.fn(() => mockShoppingLists),
  getById: jest.fn((id) => mockShoppingLists.find((list) => list.id === id)),
  create: jest.fn(({ name, items }) => {
    const newList = {
      id: Date.now().toString(),
      name,
      owner: "u1",
      members: ["u1"],
      items,
      archived: false,
    };
    mockShoppingLists.push(newList);
    return newList;
  }),
delete: jest.fn((id) => {
  const index = mockShoppingLists.findIndex((list) => list.id === id);
  if (index !== -1) {
    mockShoppingLists.splice(index, 1);
    return true;
  }
  return false;
}),
  update: jest.fn((id, updates) => {
    const index = mockShoppingLists.findIndex((list) => list.id === id);
    if (index === -1) {
      console.log("List not found for ID:", id);
      return null;
    }

    const shoppingList = mockShoppingLists[index];


    if (updates.name !== undefined) {
      if (typeof updates.name !== "string") {
        throw new Error("Invalid name");
      }
      shoppingList.name = updates.name;
    }


    if (updates.items !== undefined) {
      if (!Array.isArray(updates.items)) {
        throw new Error("Items must be an array");
      }
      shoppingList.items = updates.items;
    }

    console.log("Before update:", shoppingList);
    mockShoppingLists[index] = { ...shoppingList, ...updates };
    console.log("After update:", mockShoppingLists[index]);

    return mockShoppingLists[index];
  }),
}));





test("GET /shoppingList - should return all shopping lists", () => {
  const shoppingLists = ShoppingList.getAll();
  expect(shoppingLists).toEqual(mockShoppingLists);
  expect(ShoppingList.getAll).toHaveBeenCalledTimes(1);
});


test("GET /shoppingList/:id - should return a shopping list by ID", () => {
  const shoppingList = ShoppingList.getById("1");
  expect(shoppingList).toEqual(mockShoppingLists[0]);
  expect(ShoppingList.getById).toHaveBeenCalledWith("1");
});

test("GET /shoppingList/:id - should return null for nonexistent ID", () => {
  const shoppingList = ShoppingList.getById("99");
  expect(shoppingList).toBeUndefined();
});


test("POST /shoppingList - should create a new shopping list", () => {
  const newList = ShoppingList.create({ name: "TESCO", items: ["Apples", "Bread"] });
  expect(newList.name).toBe("TESCO");
  expect(mockShoppingLists.length).toBe(3);
  expect(mockShoppingLists[2].name).toBe("TESCO");
});


test("DELETE /shoppingList/:id - should delete a shopping list by ID", () => {
  const result = ShoppingList.delete("1");
  expect(result).toBe(true);
  expect(mockShoppingLists.length).toBe(1); 
  expect(mockShoppingLists.find((list) => list.id === "1")).toBeUndefined();
});

test("DELETE /shoppingList/:id - should return false for nonexistent ID", () => {
  const result = ShoppingList.delete("99");
  expect(result).toBe(false);
});

test("PUT /shoppingList/:id - should update a shopping list by ID", () => {
  const updates = { name: "Updated LIDL", items: ["Milk", "Butter"] };


  const updatedList = ShoppingList.update("2", updates);


  expect(updatedList.name).toBe("Updated LIDL");
  expect(updatedList.items).toEqual(["Milk", "Butter"]);


  const updatedMockShoppingLists = ShoppingList.getAll();
  expect(updatedMockShoppingLists[1].name).toBe("Updated LIDL");
  expect(updatedMockShoppingLists[1].items).toEqual(["Milk", "Butter"]);
});

test("PUT /shoppingList/:id - should return null for nonexistent ID", () => {
  const updates = { name: "Nonexistent List", items: ["Something"] };


  const updatedList = ShoppingList.update("99", updates);


  expect(updatedList).toBeNull();
});

test("PUT /shoppingList/:id - should throw error for invalid name", () => {
  const updates = { name: 12345 }; 

  expect(() => ShoppingList.update("2", updates)).toThrow("Invalid name");
});

test("PUT /shoppingList/:id - should throw error for invalid items", () => {
  const updates = { items: "Not an array" }; 

  expect(() => ShoppingList.update("2", updates)).toThrow("Items must be an array");
});
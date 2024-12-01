const express = require("express");
const bodyParser = require("body-parser");
const es = require("./src/routes/shoppingListRoutes");
const { errorHandler } = require("./src/utils/errorHandler");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/shopping-lists", es);


// Global error handler
app.use(errorHandler);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

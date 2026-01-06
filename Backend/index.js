const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");

//Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

//Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/CodvedaDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

//Using routes
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

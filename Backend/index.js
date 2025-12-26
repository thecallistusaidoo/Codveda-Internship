const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware to read JSON
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/CodvedaDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Codveda Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Using routes
app.use("/api", userRoutes);
const mongoose = require("mongoose");
const User = require("./Models/user");

mongoose.connect("mongodb://127.0.0.1:27017/CodvedaDB")
  .then(async () => {
    console.log("MongoDB Connected");

    const newUser = new User({
      name: "Codveda Intern",
      email: "intern@codveda.com",
      role: "Full-Stack Intern"
    });

    await newUser.save();
    console.log("User saved successfully");

    mongoose.connection.close();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

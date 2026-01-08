const express = require("express");
const User = require("../Models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");



// READ users - PROTECTED
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//UPDATE USER
router.put("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE user
router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// REGISTER user
router.post("/register", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "User"
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// LOGIN user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {userId: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    console.log("LOGIN SUCCESS:", {
      email: user.email,
      role: user.role,
    });


    res.json({ 
      token,
      user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
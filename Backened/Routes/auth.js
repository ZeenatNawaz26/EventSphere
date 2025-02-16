const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/users_model");
const router = express.Router();
require("dotenv").config(); // Load environment variables

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use .env variable

// Signup Route
router.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase(); // Convert email to lowercase

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Error signing up", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase(); // Convert email to lowercase

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    console.log("🔹 Input Password:", password);
    console.log("🔹 Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;

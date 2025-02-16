const User = require("../Models/users_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.registerUser = async (req, res) => {
  try {
    let { Name, Email, Password } = req.body;

    if (!Email || !Password || !Name) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const lowercaseEmail = Email.toLowerCase(); // ✅ Ensure Email is always lowercase
    console.log("🔹 Registering Email:", lowercaseEmail);
    console.log("🔹 Plain Password (Before Hashing):", Password);

    let existingUser = await User.findOne({ Email: lowercaseEmail });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(Password, saltRounds);
    
    console.log("🔹 Hashed Password Before Saving:", hashedPassword); // ✅ Debugging

    let newUser = new User({ Name, Email: lowercaseEmail, Password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};




exports.loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log("🔹 Input Email:", Email);
    console.log("🔹 Input Password:", Password);

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    console.log("🔹 Stored Hashed Password from DB:", user.Password);

    const isMatch = await bcrypt.compare(Password, user.Password);
    
    console.log("🔹 Comparing:", Password, "with", user.Password);
    console.log("🔹 Password Match Result:", isMatch ? "✅ Matched" : "❌ Not Matched");

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ msg: "Login successful", token, user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};



// Fetch All Users
exports.getUsers = async (req, res) => {
  try {
    let users = await User.find().select("-Password"); // Hide passwords
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

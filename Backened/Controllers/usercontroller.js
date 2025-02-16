const bcrypt = require("bcrypt");
const User = require("../Models/users_model");

// ✅ Register User
const registerUser = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create new user
    const newUser = new User({ Name, Email, Password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    console.log("Login Request Received:", req.body); // ✅ Log input data

    // Check if user exists
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User Found:", user); // ✅ Log user data

    // Compare hashed password
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Password Matched!"); // ✅ Log success

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Error logging in:", error); // ✅ Log error in console
    res.status(500).json({ message: "Error logging in", error });
  }
};


// ✅ Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-Password"); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// ✅ Export Controllers
module.exports = { registerUser, loginUser, getUsers };

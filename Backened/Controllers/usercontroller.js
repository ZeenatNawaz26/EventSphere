const User = require("../Models/users_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Load secret from .env

// ✅ Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, contactNumber, role } = req.body;

        if (!name || !email || !password || !contactNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            contactNumber,
            role: role || "attendee",
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// ✅ Login User
const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
          message: "Login successful",
          token,
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role, // ✅ Ensure role is sent to frontend
      });
  } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
  }
};


// ✅ Get All Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

module.exports = { registerUser, loginUser, getUsers };

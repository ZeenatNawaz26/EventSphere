const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/users_model"); // Import User model

const { registerUser, loginUser, getUsers } = require("../Controllers/usercontroller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.delete("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Validate userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, error: "Invalid userId." });
      }
  
      // Find and delete the user
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ success: false, error: "User not found." });
      }
  
      res.status(200).json({ success: true, message: "User deleted successfully!" });
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      res.status(500).json({ success: false, error: "Failed to delete user." });
    }
  });


module.exports = router;  // ✅ Must be router, not an object

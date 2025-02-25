const express = require("express");
const router = express.Router();
const Message = require("../Models/Message");
const mongoose = require("mongoose");

// ✅ Get Messages for a User
router.get("/:expoId/:userId", async (req, res) => {
  try {
    const { expoId, userId } = req.params;

    console.log("🔍 Fetching messages for expoId:", expoId, "and userId:", userId);

    // ✅ Validate if expoId and userId are valid MongoDB ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(expoId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: "Invalid expoId or userId." });
    }

    // ✅ Fetch messages where the user is either the sender or receiver
    const messages = await Message.find({
      expoId,
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 });

    if (!messages.length) {
      console.log("⚠️ No messages found for this user in this expo.");
      return res.status(200).json({ success: true, messages: [], message: "No messages found." });
    }

    console.log(`✅ Found ${messages.length} messages`);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve messages." });
  }
});

module.exports = router;

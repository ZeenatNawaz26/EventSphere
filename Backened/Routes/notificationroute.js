const express = require("express");
const Message = require("../Models/Message");
const Notification = require("../Models/NotificationModel");
const router = express.Router();

// ✅ Fetch unread messages (notifications)
// router.get("/notifications/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const notifications = await Message.find({ receiverId: userId, isRead: false }).populate("senderId", "name");
//     res.json(notifications);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/notifications/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log("🔍 Fetching notifications for userId:", userId);
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid userId format" });
      }
  
      const notifications = await Message.find({ receiverId: userId, isRead: false }).populate("senderId", "name");
  
      if (!notifications.length) {
        return res.status(404).json({ error: "No notifications found for this user" });
      }
  
      res.json(notifications);
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
// ✅ Mark message as read
router.put("/mark-as-read/:messageId", async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.messageId, { isRead: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Reply to a message
router.post("/reply/:messageId", async (req, res) => {
    try {
      const { senderId, message } = req.body;
      const messageId = req.params.messageId;
  
      console.log("📩 Reply Request Received:", { messageId, senderId, message });
  
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { $push: { replies: { senderId, message } } },
        { new: true }
      );
  
      if (!updatedMessage) {
        return res.status(404).json({ error: "Message not found in database" });
      }
  
      console.log("✅ Updated Message with Reply:", updatedMessage);
      res.json(updatedMessage);
    } catch (error) {
      console.error("❌ Reply Error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  

module.exports = router;

const express = require("express");
const router = express.Router();
const { sendMessage, getMessages, markAsRead, replyToMessage } = require("../Controllers/messageController");

// Send message
router.post("/send", sendMessage);

// Get messages for a user
router.get("/:userId", getMessages);

// ✅ Mark message as read (Fixed route name)
router.put("/mark-as-read/:messageId", markAsRead);

// ✅ Reply to a message
router.put("/reply/:messageId", replyToMessage);

module.exports = router;

// const Message = require("../Models/Message")

// // Send a message
// // exports.sendMessage = async (req, res) => {
// //   try {
// //     const { senderId, receiverId, message } = req.body;

// //     if (!senderId || !receiverId || !message) {
// //       return res.status(400).json({ error: "All fields are required" });
// //     }

// //     const newMessage = new Message({ senderId, receiverId, message });
// //     await newMessage.save();

// //     res.status(201).json({ message: "Message sent successfully", data: newMessage });
// //   } catch (error) {
// //     res.status(500).json({ error: "Server Error" });
// //   }
// // };
// exports. sendMessage = async (req, res) => {
//   try {
//     console.log("Incoming Message Data:", req.body); // ✅ Debugging log
//     const { senderId, receiverId, message } = req.body;

//     if (!senderId || !receiverId || !message) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newMessage = new MessageModel({ senderId, receiverId, message });
//     await newMessage.save();

//     res.status(201).json({ message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error in sendMessage:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Get messages between users
// // exports.getMessages = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const messages = await Message.find({
// //       $or: [{ senderId: userId }, { receiverId: userId }],
// //     }).populate("senderId receiverId", "name");

// //     res.status(200).json(messages);
// //   } catch (error) {
// //     res.status(500).json({ error: "Server Error" });
// //   }
// // };
// exports.getMessages = async (req, res) => {
//   try {
//     console.log(req.params);  // <---- Add this line
//     const { userId } = req.params;

//     const messages = await Message.find({
//       $or: [{ senderId: userId }, { receiverId: userId }],
//     }).populate("senderId receiverId", "name");

//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// // Mark message as read
// exports.markAsRead = async (req, res) => {
//   try {
//     const { messageId } = req.params;
//     await Message.findByIdAndUpdate(messageId, { isRead: true });
//     res.status(200).json({ message: "Message marked as read" });
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }
// };
const Message = require("../Models/Message")
const mongoose = require("mongoose");


// Send a message
exports.sendMessage = async (req, res) => {
  try {
    console.log("Incoming Message Data:", req.body);
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = new Message({ senderId, receiverId, message }); // ✅ Fixed
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get messages between users
exports.getMessages = async (req, res) => {
  try {
    console.log(req.params);
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate("senderId receiverId", "name");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.replyToMessage = async (req, res) => {
  try {
    const { senderId, message } = req.body;
    const messageId = req.params.messageId;

    console.log("📩 Reply Request Received:", { messageId, senderId, message });

    // ✅ Ensure message is a string, not an object
    if (typeof message !== "string") {
      return res.status(400).json({ error: "Message must be a string" });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { $push: { replies: { senderId, message } } }, // ✅ Fix here
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

};

// Mark message as read
// exports.markAsRead = async (req, res) => {
//   try {
//     const { messageId } = req.params;
//     await Message.findByIdAndUpdate(messageId, { isRead: true });
//     res.status(200).json({ message: "Message marked as read" });
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }
// };     
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ error: "Invalid messageId format" });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ success: true, updatedMessage });
  } catch (error) {
    console.error("❌ Error in markAsRead:", error);
    res.status(500).json({ error: error.message });
  }
};
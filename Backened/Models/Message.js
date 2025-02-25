const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin/Exhibitor/Attendee
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient
  expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true }, // Link to an Expo
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);

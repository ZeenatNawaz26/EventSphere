const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who asked
  expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true },
  question: { type: String, required: true },
  answer: { type: String }, // Admin response
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inquiry", inquirySchema);

const mongoose = require("mongoose");

const ExpoSchema = new mongoose.Schema({
  title: { type: String, required: true },  // ✅ Corrected from name → title
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true }
});

// ✅ Prevent overwriting the model if it already exists
const Expo = mongoose.models.Expo || mongoose.model("Expo", ExpoSchema);

module.exports = Expo;

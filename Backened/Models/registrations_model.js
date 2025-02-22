const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
});

// Prevent overwriting the model
const Registration = mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);

module.exports = Registration;

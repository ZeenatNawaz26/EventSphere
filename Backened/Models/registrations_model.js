const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo" },
    status: { type: String, enum: ["pending", "approved"], default: "pending" }
});

module.exports = mongoose.model("Registration", registrationSchema);

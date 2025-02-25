const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true },
    type: { type: String, enum: ["attendee", "booth", "session"], required: true },
    data: { type: Object, required: true }, // Store counts, trends, etc.
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analytics", analyticsSchema);

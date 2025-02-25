const mongoose = require("mongoose");

const BoothSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true }, // Booth Number
  location: { type: String, required: true }, // Floor Location
  status: { type: String, enum: ["Available", "Reserved", "Occupied"], default: "Available" },
  exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: "Exhibitor", default: null }, // Assigned Exhibitor
  expo: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true } // Linked Expo Event
});

const Booth = mongoose.model("Booth", BoothSchema);
module.exports = Booth;

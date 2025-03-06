const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speaker: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // Linked to an event
  attendeeCount: { type: Number, default: 0 }, // Analytics ke liye count
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;

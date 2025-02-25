const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // Link to an Event
    status: { type: String, enum: ["Registered", "Checked-in"], default: "Registered" }, // Track check-in status
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);
module.exports = Attendee;

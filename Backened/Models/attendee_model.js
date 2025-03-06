const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // Link to an Event
    status: { type: String, enum: ["Registered", "Checked-in"], default: "Registered" }, // Track check-in status
    checkedIn: { type: Boolean, default: false },
    checkInTime: { type: Date }, // ✅ Check-in ka time store karne ke liye
    sessionsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }], // ✅ Track which sessions they attended
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true }, // ✅ Expo ID for multi-expo support
  },
  { timestamps: true }
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);
module.exports = Attendee;

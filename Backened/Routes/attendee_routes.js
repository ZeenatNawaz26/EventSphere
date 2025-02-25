const express = require("express");
const { registerAttendee, getAllAttendees, checkInAttendee } = require("../Controllers/attendee_controller");

const router = express.Router();

// ✅ POST: Register a new attendee
router.post("/register", registerAttendee);

// ✅ GET: Fetch all attendees
router.get("/", getAllAttendees);

// ✅ PUT: Check-in attendee
router.put("/checkin/:id", checkInAttendee);

module.exports = router;

const express = require("express");
const router = express.Router();
const { registerAttendee, getAllAttendees, setCheckedIn, setCheckedOut } = require("../Controllers/attendee_controller");

// Routes
router.post("/register", registerAttendee);
router.get("/", getAllAttendees);
router.put("/:id/checkin", setCheckedIn); // Set attendee as checked-in
router.put("/:id/checkout", setCheckedOut); // Set attendee as checked-out

module.exports = router;
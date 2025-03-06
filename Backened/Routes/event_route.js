const express = require("express");
const { createEvent, getEvents } = require("../Controllers/event_controller");

const router = express.Router();

router.get("/", getEvents); // ✅ Get all events
router.post("/", createEvent); // ✅ Add a new event

module.exports = router;

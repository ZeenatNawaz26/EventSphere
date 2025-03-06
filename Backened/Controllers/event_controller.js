const Event = require("../Models/event_model");

// ✅ Add New Event
const createEvent = async (req, res) => {
    try {
        const { name, date, location } = req.body;
        if (!name || !date || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = new Event({ name, date, location });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully!", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Get All Events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        console.log("Fetched Events:", events); // ✅ Debugging Log
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createEvent, getEvents };

// const mongoose = require("mongoose");
// const Attendee = require("../Models/attendee_model");

// // ✅ Register a new attendee
// const registerAttendee = async (req, res) => {
//     try {
//         const { name, email, phone, event } = req.body;

//         if (!name || !email || !phone || !event) {
//             return res.status(400).json({ message: "All fields are required" });
//         }34


//         if (!mongoose.Types.ObjectId.isValid(event)) {
//             return res.status(400).json({ message: "Invalid event ID" });
//         }

//         const newAttendee = new Attendee({ name, email, phone, event, checkedIn: true }); // ✅ Ensuring default value
//         await newAttendee.save();

//         res.status(201).json({ message: "Attendee registered successfully!" });
//     } catch (error) {
//         console.error("Error registering attendee:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // ✅ Get all attendees
// const getAllAttendees = async (req, res) => {
//     try {
//         const attendees = await Attendee.find().populate("event");
//         res.status(200).json(attendees);
//     } catch (error) {
//         console.error("Error fetching attendees:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // ✅ Check-in attendee
// const checkInAttendee = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid attendee ID" });
//         }

//         const attendee = await Attendee.findById(id);
//         if (!attendee) {
//             return res.status(404).json({ message: "Attendee not found" });
//         }

//         attendee.status = "Checked-in";
//         await attendee.save();

//         res.status(200).json({ message: "Attendee checked in successfully!" });
//     } catch (error) {
//         console.error("Error checking in attendee:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// module.exports = { registerAttendee, getAllAttendees, checkInAttendee };


const mongoose = require("mongoose");
const Attendee = require("../Models/attendee_model");

// ✅ Register a new attendee
const registerAttendee = async (req, res) => {
    try {
        const { name, email, phone, event } = req.body;

        if (!name || !email || !phone || !event) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(event)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const newAttendee = new Attendee({ name, email, phone, event, checkedIn: false }); // Default to "Not Checked In"
        await newAttendee.save();

        res.status(201).json({ message: "Attendee registered successfully!" });
    } catch (error) {
        console.error("Error registering attendee:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Get all attendees
const getAllAttendees = async (req, res) => {
    try {
        const attendees = await Attendee.find().populate("event");
        res.status(200).json(attendees);
    } catch (error) {
        console.error("Error fetching attendees:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Set attendee as checked-in
const setCheckedIn = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid attendee ID" });
        }

        const attendee = await Attendee.findById(id);
        if (!attendee) {
            return res.status(404).json({ message: "Attendee not found" });
        }

        attendee.checkedIn = true; // Explicitly set to "Checked In"
        await attendee.save();

        res.status(200).json({ message: "Attendee checked in successfully!" });
    } catch (error) {
        console.error("Error checking in attendee:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Set attendee as checked-out
const setCheckedOut = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid attendee ID" });
        }

        const attendee = await Attendee.findById(id);
        if (!attendee) {
            return res.status(404).json({ message: "Attendee not found" });
        }

        attendee.checkedIn = false; // Explicitly set to "Checked Out"
        await attendee.save();

        res.status(200).json({ message: "Attendee checked out successfully!" });
    } catch (error) {
        console.error("Error checking out attendee:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { registerAttendee, getAllAttendees, setCheckedIn, setCheckedOut };
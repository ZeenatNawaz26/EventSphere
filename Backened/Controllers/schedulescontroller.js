const Schedule = require("../Models/schedules_model");

// ✅ Create a new schedule
exports.createSchedule = async (req, res) => {
    try {
        const { expoId, eventName, startTime, endTime } = req.body;

        if (!expoId || !eventName || !startTime || !endTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const schedule = new Schedule({ expoId, eventName, startTime, endTime });
        await schedule.save();

        res.status(201).json({ message: "Schedule created successfully", schedule });
    } catch (error) {
        console.error("❌ Error creating schedule:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ✅ Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate("expoId", "name");
        res.status(200).json(schedules);
    } catch (error) {
        console.error("❌ Error fetching schedules:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ✅ Get schedules by Expo ID
exports.getSchedulesByExpo = async (req, res) => {
    try {
        const { expoId } = req.params;

        if (!expoId) {
            return res.status(400).json({ message: "Expo ID is required" });
        }

        const schedules = await Schedule.find({ expoId }).populate("expoId", "name");
        res.status(200).json(schedules);
    } catch (error) {
        console.error("❌ Error fetching schedules by Expo ID:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ✅ Update schedule
exports.updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName, startTime, endTime } = req.body;

        const schedule = await Schedule.findByIdAndUpdate(id, { eventName, startTime, endTime }, { new: true });

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        res.status(200).json({ message: "Schedule updated successfully", schedule });
    } catch (error) {
        console.error("❌ Error updating schedule:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ✅ Delete schedule
exports.deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const schedule = await Schedule.findByIdAndDelete(id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting schedule:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

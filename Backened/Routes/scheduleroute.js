const express = require("express");
const router = express.Router();
const scheduleController = require("../Controllers/schedulescontroller");

// ✅ Create a new schedule
router.post("/create", scheduleController.createSchedule);

// ✅ Get all schedules
router.get("/", scheduleController.getAllSchedules);

// ✅ Get schedules by Expo ID
router.get("/:expoId", scheduleController.getSchedulesByExpo);

// ✅ Update schedule by ID
router.put("/:id", scheduleController.updateSchedule);

// ✅ Delete schedule by ID
router.delete("/:id", scheduleController.deleteSchedule);




module.exports = router;

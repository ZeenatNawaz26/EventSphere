const express = require("express");
const router = express.Router();
const exhibitorController = require("../Controllers/exhibitor_controller");

// ✅ Register a new Exhibitor
router.post("/register", exhibitorController.registerExhibitor);

// ✅ Get all Exhibitors
router.get("/", exhibitorController.getAllExhibitors);

// ✅ Approve/Reject Exhibitor
router.put("/:id/status", exhibitorController.updateExhibitorStatus);

// ✅ Assign Booth
router.put("/:id/assign-booth", exhibitorController.assignBooth);

module.exports = router;

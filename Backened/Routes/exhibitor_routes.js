const express = require("express");
const { registerExhibitor, getAllExhibitors, updateExhibitor } = require("../Controllers/exhibitor_controller");

const router = express.Router();

// ✅ POST: Register Exhibitor
router.post("/register", registerExhibitor);

// ✅ GET: Fetch All Exhibitors
router.get("/", getAllExhibitors);

// ✅ PUT: Update Exhibitor (Fix: Function Defined Properly)
router.put("/:id", updateExhibitor);

module.exports = router;

const express = require("express");
const router = express.Router();
const analyticsController = require("../Controllers/analytics_controller")

// 📌 Get analytics for an expo
router.get("/:expoId", analyticsController.getAnalytics);

// 📌 Get real-time analytics
router.get("/realtime/:expoId", analyticsController.getRealTimeAnalytics);

// 📌 Add analytics data
router.post("/add", analyticsController.addAnalytics);

module.exports = router;

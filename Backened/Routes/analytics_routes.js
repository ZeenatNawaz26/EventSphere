const express = require("express");
const { getAttendeeEngagement, getBoothTraffic, getSessionPopularity, getRealTimeAnalytics } = require("../Controllers/analytics_controller");

const router = express.Router();

router.get("/attendee-engagement", getAttendeeEngagement);
router.get("/booth-traffic", getBoothTraffic);
router.get("/session-popularity", getSessionPopularity);
router.get("/real-time-analytics", getRealTimeAnalytics);

module.exports = router;

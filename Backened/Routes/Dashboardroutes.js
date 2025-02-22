const express = require("express");
const router = express.Router();
const Expo = require("../Models/expos_model")
const Registration = require("../Models/registrations_model")

router.get("/stats", async (req, res) => {
  try {
    const totalExhibitors = await Expo.countDocuments();
    const totalVisitors = await Registration.countDocuments();
    const totalRevenue = await Registration.aggregate([{ $group: { _id: null, total: { $sum: "$amountPaid" } } }]);
    const totalEvents = await Expo.distinct("eventName");

    res.json({
      totalExhibitors,
      totalVisitors,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalEvents: totalEvents.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

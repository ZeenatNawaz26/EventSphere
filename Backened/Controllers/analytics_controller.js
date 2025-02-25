const Analytics = require("../Models/analytics_model")

const mongoose = require("mongoose");


exports.getAnalytics = async (req, res) => {
  const { expoId } = req.params;

  // 🛑 Validate expoId before querying MongoDB
  if (!mongoose.Types.ObjectId.isValid(expoId)) {
    return res.status(400).json({ error: "Invalid Expo ID format" });
  }

  try {
    const analyticsData = await Analytics.find({ expoId });
    res.json(analyticsData);
  } catch (error) {
    console.error("Server error fetching analytics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// 📌 Get real-time analytics
exports.getRealTimeAnalytics = async (req, res) => {
    try {
        const { expoId } = req.params;

        // ✅ Validate expoId before querying MongoDB
        if (!expoId || !expoId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid expoId format" });
        }

        const analytics = await Analytics.find({ expoId });
        res.json(analytics);
    } catch (error) {
        console.error("❌ Error fetching real-time analytics:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// 📌 Add new analytics data
exports.addAnalytics = async (req, res) => {
    try {
        const { expoId, type, data } = req.body;

        if (!expoId || !type || !data) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAnalytics = new Analytics({ expoId, type, data });
        await newAnalytics.save();

        res.status(201).json({ message: "Analytics data added", newAnalytics });
    } catch (error) {
        console.error("❌ Error adding analytics:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

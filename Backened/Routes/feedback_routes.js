const express = require("express");
const Feedback = require("../Models/feedback_model"); // Create this model
const router = express.Router();

// ✅ Submit Feedback (POST)
router.post("/submit", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "User ID and message are required" });
    }

    const feedback = new Feedback({ userId, message });
    await feedback.save();

    res.json({ success: true, message: "Feedback submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Feedback (GET) – For Admin Panel
router.get("/all", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    console.log("Without Populate:", feedbacks);

    const populatedFeedbacks = await Feedback.find().populate("userId", "name email");
    console.log("With Populate:", populatedFeedbacks);

    res.json(populatedFeedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;

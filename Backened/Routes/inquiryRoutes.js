const express = require("express");
const router = express.Router();
const Inquiry = require("../Models/inquiry_model");

// Submit an inquiry
router.post("/ask", async (req, res) => {
  try {
    const { userId, expoId, question } = req.body;
    const newInquiry = new Inquiry({ userId, expoId, question });
    await newInquiry.save();
    res.status(201).json({ success: true, message: "Inquiry submitted!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to submit inquiry." });
  }
});

// Admin answers an inquiry
router.put("/answer/:id", async (req, res) => {
  try {
    const { answer } = req.body;
    await Inquiry.findByIdAndUpdate(req.params.id, { answer });
    res.json({ success: true, message: "Inquiry answered." });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to answer inquiry." });
  }
});

module.exports = router;

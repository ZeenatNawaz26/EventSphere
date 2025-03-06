const express = require("express");
const router = express.Router();
const Settings = require("../Models/settings_model"); // Ensure correct model import

// Update settings
router.put("/", async (req, res) => {
    try {
        console.log("🔧 Updating settings:", req.body);

        const updatedSettings = await Settings.findOneAndUpdate(
            {}, // Assuming single settings document
            { $set: req.body },
            { new: true, upsert: true } // upsert: create if not exists
        );

        if (!updatedSettings) {
            return res.status(404).json({ error: "Settings not found" });
        }

        res.json(updatedSettings);
    } catch (error) {
        console.error("❌ Error updating settings:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

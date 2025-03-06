const Settings = require("../Models/settings_model");

// 🟢 Get User Settings
exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ userId: req.user.id });

        // Ensure default structure
        if (!settings) {
            settings = {
                userId: req.user.id,
                theme: "light",
                notifications: true,
                privacy: { showProfile: true, allowMessages: true },
                security: { twoFactorAuth: false, changePasswordDate: new Date() }
            };
        }

        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};


// 🟢 Update User Settings
exports.updateSettings = async (req, res) => {
    try {
        const updatedSettings = await Settings.findOneAndUpdate(
            { userId: req.user.id },
            { $set: req.body },
            { new: true, upsert: true }
        );
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

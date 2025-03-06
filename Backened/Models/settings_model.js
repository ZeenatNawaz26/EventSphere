const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    notifications: { type: Boolean, default: true },
    privacy: {
        showProfile: { type: Boolean, default: true },
        allowMessages: { type: Boolean, default: true },
    },
    security: {
        twoFactorAuth: { type: Boolean, default: false },
        changePasswordDate: { type: Date, default: Date.now },
    }
});

module.exports = mongoose.model("Settings", SettingsSchema);

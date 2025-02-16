const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo" },
    eventName: String,
    startTime: Date,
    endTime: Date
});

module.exports = mongoose.model("Schedule", scheduleSchema);

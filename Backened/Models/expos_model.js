const mongoose = require("mongoose");

const expoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String
});

module.exports = mongoose.model("Expo", expoSchema);

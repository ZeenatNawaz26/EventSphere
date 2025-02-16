const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema({
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo" },
    exhibitor: String,
    size: String,
    price: Number
});

module.exports = mongoose.model("Booth", boothSchema);

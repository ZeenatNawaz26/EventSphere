const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema({
    expoId: { type: String, required: true },
    exhibitor: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true }
  });
  

module.exports = mongoose.model("Booth", boothSchema);

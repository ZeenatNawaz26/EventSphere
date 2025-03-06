// const mongoose = require("mongoose");

// const boothSchema = new mongoose.Schema({
//   number: { type: String, required: true },
//   location: { type: String, required: true },
//   status: { type: String, default: "Available" },
//   exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: "Exhibitor", default: null },
//   expo: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true },
//   boothType: { type: String, required: true, enum: ["Small", "Medium", "Large"], default: "Small" },
//   visitorCount: { type: Number, default: 0 }, // ✅ Track total visitors
//   engagementScore: { type: Number, default: 0 }, // ✅ Analytics ke liye engagement score
//   category: { type: String, enum: ["Tech", "Food", "Retail", "Other"], default: "Other" } // ✅ Booth category for segmentation
// });

// const Booth = mongoose.model("Booth", boothSchema);

// module.exports = Booth;
const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema({
  number: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: "Available" },
  exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: "Exhibitor", default: null },
  expo: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true },
  boothType: { type: String, enum: ["Small", "Medium", "Large"], default: "Small" },
  visitorCount: { type: Number, default: 0 },
  engagementScore: { type: Number, default: 0 },
  category: { type: String, enum: ["Tech", "Food", "Retail", "Other"], default: "Other" }
});

const Booth = mongoose.model("Booth", boothSchema);
module.exports = Booth;

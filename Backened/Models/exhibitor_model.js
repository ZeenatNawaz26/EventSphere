const mongoose = require("mongoose");

const ExhibitorSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  boothPreference: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  assignedBooth: { type: mongoose.Schema.Types.ObjectId, ref: "Booth", default: null }
});

const Exhibitor = mongoose.models.Exhibitor || mongoose.model("Exhibitor", ExhibitorSchema);

module.exports = Exhibitor;

const mongoose = require("mongoose");

const ExhibitorSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensure emails are stored in lowercase
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"], // Ensures only numbers with 10-15 digits
    },
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true }, // Reference to Expo
    boothPreference: { 
        type: String, 
        required: true, 
        enum: ["A1", "A2", "B1", "B2", "Small", "Medium", "Large"] // Allowed booth types
    },
    assignedBooth: { type: mongoose.Schema.Types.ObjectId, ref: "Booth", default: null }, // Reference to Booth
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

// Ensure unique emails (case-insensitive)
ExhibitorSchema.index({ email: 1 }, { unique: true });

const Exhibitor = mongoose.model("Exhibitor", ExhibitorSchema);
module.exports = Exhibitor;
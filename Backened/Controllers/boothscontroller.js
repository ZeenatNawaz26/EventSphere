const mongoose = require("mongoose");
const Booth = require("../Models/booths_model");
const Expo = require("../Models/expos_model");
const Exhibitor = require("../Models/exhibitor_model");

// ✅ Find an Available Booth by Preference & Expo ID
const findAvailableBooth = async (boothPreference, expoId) => {
    console.log(`🔍 Searching for available booth with type: ${boothPreference} in Expo ID: ${expoId}`);

    try {
        // Ensure expoId is converted to ObjectId
        const expoObjectId = new mongoose.Types.ObjectId(expoId);

        // Ensure boothType comparison is case-insensitive
        const booth = await Booth.findOne({
            boothType: { $regex: new RegExp("^" + boothPreference + "$", "i") }, // Case insensitive match
            status: "Available",
            expo: expoObjectId // Ensure matching with ObjectId
        });

        if (!booth) {
            console.warn(`⚠️ No available booths found for type: ${boothPreference} in Expo: ${expoId}`);
            return null;
        }

        console.log(`✅ Found booth: ${booth.number}`);
        return booth;
    } catch (error) {
        console.error("❌ Error finding booth:", error);
        throw new Error("Error finding booth");
    }
};

// ✅ Create a new Booth
const createBooth = async (req, res) => {
    try {
        const { number, location, expo, exhibitor, boothType } = req.body;

        if (!number || !location || !expo) {
            return res.status(400).json({ message: "All fields (number, location, expo) are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(expo)) {
            return res.status(400).json({ message: "Invalid Expo ID format" });
        }

        const existingExpo = await Expo.findById(expo);
        if (!existingExpo) {
            return res.status(404).json({ message: "Expo not found" });
        }

        let assignedExhibitor = null;
        if (exhibitor) {
            if (!mongoose.Types.ObjectId.isValid(exhibitor)) {
                return res.status(400).json({ message: "Invalid Exhibitor ID format" });
            }
            assignedExhibitor = await Exhibitor.findById(exhibitor);
            if (!assignedExhibitor) {
                return res.status(404).json({ message: "Exhibitor not found" });
            }
        }

        const existingBooth = await Booth.findOne({ number, expo });
        if (existingBooth) {
            return res.status(400).json({ message: "Booth number already exists in this expo" });
        }

        const newBooth = new Booth({
            number,
            location,
            expo: new mongoose.Types.ObjectId(expo),
            exhibitor: assignedExhibitor ? assignedExhibitor._id : null,
            boothType: boothType || "Small",
            status: "Available",
        });

        await newBooth.save();
        res.status(201).json({ message: "Booth created successfully", booth: newBooth });
    } catch (error) {
        console.error("❌ Error creating booth:", error);
        res.status(500).json({ message: "Error creating booth", error: error.message });
    }
};

// ✅ Get all booths
const getAllBooths = async (req, res) => {
    try {
        const booths = await Booth.find().populate("expo").populate("exhibitor");
        res.status(200).json(booths);
    } catch (error) {
        console.error("❌ Error fetching booths:", error);
        res.status(500).json({ message: "Error fetching booths", error: error.message });
    }
};

// ✅ Get booth by ID

// ✅ Fix: Validate Booth ID Before Using It
const getBoothById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("❌ Invalid Booth ID format:", id);
            return res.status(400).json({ message: "Invalid Booth ID format" });
        }

        const booth = await Booth.findById(id).populate("expo").populate("exhibitor");

        if (!booth) {
            return res.status(404).json({ message: "Booth not found" });
        }

        res.status(200).json(booth);
    } catch (error) {
        console.error("❌ Error fetching booth:", error);
        res.status(500).json({ message: "Error fetching booth", error: error.message });
    }
};


// ✅ Update booth
// const updateBooth = async (req, res) => {
//     try {
//         const { number, location, expo, exhibitor, boothType, status } = req.body;
//         const boothId = req.params.id;

//         if (!mongoose.Types.ObjectId.isValid(boothId)) {
//             return res.status(400).json({ message: "Invalid Booth ID format" });
//         }

//         const booth = await Booth.findById(boothId);
//         if (!booth) {
//             return res.status(404).json({ message: "Booth not found" });
//         }

//         if (number) booth.number = number;
//         if (location) booth.location = location;
//         if (expo) booth.expo = new mongoose.Types.ObjectId(expo);
//         if (exhibitor) booth.exhibitor = new mongoose.Types.ObjectId(exhibitor);
//         if (boothType) booth.boothType = boothType;
//         if (status) booth.status = status;

//         await booth.save();
//         res.status(200).json({ message: "Booth updated successfully", booth });
//     } catch (error) {
//         console.error("❌ Error updating booth:", error);
//         res.status(500).json({ message: "Error updating booth", error: error.message });
//     }
// };

// ✅ Get booths by Expo
const getBoothsByExpo = async (req, res) => {
    try {
        const { expoId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(expoId)) {
            return res.status(400).json({ message: "Invalid Expo ID format" });
        }

        const booths = await Booth.find({
            expo: new mongoose.Types.ObjectId(expoId),
            status: "Available" // ✅ Only return available booths
        }).populate("expo").populate("exhibitor");

        if (!booths.length) {
            return res.status(404).json({ message: "❌ No available booths found for this expo." });
        }

        res.status(200).json(booths);
    } catch (error) {
        console.error("❌ Error fetching booths by expo:", error);
        res.status(500).json({ message: "Error fetching booths", error: error.message });
    }
};

// ✅ Delete Booth
const updateBooth = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid Booth ID format" });
      }

      const booth = await Booth.findById(id);
      if (!booth) {
          return res.status(404).json({ message: "Booth not found" });
      }

      Object.assign(booth, req.body);
      await booth.save();

      res.status(200).json({ message: "Booth updated successfully", booth });
  } catch (error) {
      console.error("❌ Error updating booth:", error);
      res.status(500).json({ message: "Error updating booth", error: error.message });
  }
};

const deleteBooth = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid Booth ID format" });
      }

      const deletedBooth = await Booth.findByIdAndDelete(id);
      if (!deletedBooth) {
          return res.status(404).json({ message: "Booth not found" });
      }

      res.json({ message: "Booth deleted successfully" });
  } catch (error) {
      console.error("❌ Error deleting booth:", error);
      res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export Functions
module.exports = {
    createBooth,
    getAllBooths,
    getBoothById,
    updateBooth,
    getBoothsByExpo,
    findAvailableBooth,
    deleteBooth
};

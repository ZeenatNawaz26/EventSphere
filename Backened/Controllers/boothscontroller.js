// const mongoose = require("mongoose");
// const Booth = require("../Models/booths_model");
// const Expo = require("../Models/expos_model");
// const Exhibitor = require("../Models/exhibitor_model");

// // ✅ Create a new Booth
// const createBooth = async (req, res) => {
//   try {
//     const { number, location, expo, exhibitor, boothType } = req.body;

//     // Validate required fields
//     if (!number || !location || !expo) {
//       return res.status(400).json({ message: "All fields (number, location, expo) are required" });
//     }

//     // Validate Expo ID format
//     if (!mongoose.Types.ObjectId.isValid(expo)) {
//       return res.status(400).json({ message: "Invalid Expo ID format" });
//     }

//     // Check if Expo exists
//     const existingExpo = await Expo.findById(expo);
//     if (!existingExpo) {
//       return res.status(404).json({ message: "Expo not found" });
//     }

//     let assignedExhibitor = null;
//     if (exhibitor) {
//       // Validate Exhibitor ID format
//       if (!mongoose.Types.ObjectId.isValid(exhibitor)) {
//         return res.status(400).json({ message: "Invalid Exhibitor ID format" });
//       }

//       assignedExhibitor = await Exhibitor.findById(exhibitor);
//       if (!assignedExhibitor) {
//         return res.status(404).json({ message: "Exhibitor not found" });
//       }
//     }

//     // Check if booth number already exists in the same expo
//     const existingBooth = await Booth.findOne({ number, expo });
//     if (existingBooth) {
//       return res.status(400).json({ message: "Booth number already exists in this expo" });
//     }

//     // Default boothType if missing
//     const finalBoothType = boothType || "Small";

//     const newBooth = new Booth({
//       number,
//       location,
//       expo,
//       exhibitor: assignedExhibitor ? assignedExhibitor._id : null,
//       boothType: finalBoothType,
//       status: "Available",
//     });

//     await newBooth.save();

//     res.status(201).json({ message: "Booth created successfully", booth: newBooth });
//   } catch (error) {
//     console.error("❌ Error creating booth:", error);
//     res.status(500).json({ message: "Error creating booth", error: error.message });
//   }
// };

// // Other functions remain the same
// const updateBooth = async (req, res) => {
//   try {
//     const { number, location, expo, exhibitor, boothType, status } = req.body;

//     const booth = await Booth.findById(req.params.id);
//     if (!booth) {
//       return res.status(404).json({ message: "Booth not found" });
//     }

//     if (number) booth.number = number;
//     if (location) booth.location = location;
//     if (expo) {
//       if (!mongoose.Types.ObjectId.isValid(expo)) {
//         return res.status(400).json({ message: "Invalid Expo ID format" });
//       }

//       const existingExpo = await Expo.findById(expo);
//       if (!existingExpo) {
//         return res.status(404).json({ message: "Expo not found" });
//       }
//       booth.expo = expo;
//     }
//     if (exhibitor) {
//       if (!mongoose.Types.ObjectId.isValid(exhibitor)) {
//         return res.status(400).json({ message: "Invalid Exhibitor ID format" });
//       }

//       const existingExhibitor = await Exhibitor.findById(exhibitor);
//       if (!existingExhibitor) {
//         return res.status(404).json({ message: "Exhibitor not found" });
//       }
//       booth.exhibitor = exhibitor;
//     }
//     if (boothType) booth.boothType = boothType;
//     if (status) booth.status = status;

//     await booth.save();

//     res.status(200).json({ message: "Booth updated successfully", booth });
//   } catch (error) {
//     console.error("❌ Error updating booth:", error);
//     res.status(500).json({ message: "Error updating booth", error: error.message });
//   }
// };

// const getAllBooths = async (req, res) => {
//   try {
//     const booths = await Booth.find().populate("expo").populate("exhibitor");
//     res.status(200).json(booths);
//   } catch (error) {
//     console.error("❌ Error fetching booths:", error);
//     res.status(500).json({ message: "Error fetching booths", error: error.message });
//   }
// };

// const getBoothById = async (req, res) => {
//   try {
//     const booth = await Booth.findById(req.params.id).populate("expo").populate("exhibitor");
//     if (!booth) {
//       return res.status(404).json({ message: "Booth not found" });
//     }
//     res.status(200).json(booth);
//   } catch (error) {
//     console.error("❌ Error fetching booth:", error);
//     res.status(500).json({ message: "Error fetching booth", error: error.message });
//   }
// };

// const deleteBooth = async (req, res) => {
//   try {
//     const booth = await Booth.findByIdAndDelete(req.params.id);
//     if (!booth) {
//       return res.status(404).json({ message: "Booth not found" });
//     }
//     res.status(200).json({ message: "Booth deleted successfully" });
//   } catch (error) {
//     console.error("❌ Error deleting booth:", error);
//     res.status(500).json({ message: "Error deleting booth", error: error.message });
//   }
// };

// module.exports = {
//   createBooth,
//   updateBooth,
//   getAllBooths,
//   getBoothById,
//   deleteBooth,
// };
const mongoose = require("mongoose");
const Booth = require("../Models/booths_model");
const Expo = require("../Models/expos_model");
const Exhibitor = require("../Models/exhibitor_model");

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
      expo: new mongoose.Types.ObjectId(expo),  // ✅ Ensure ObjectId
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
// const getBoothById = async (req, res) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Invalid Booth ID format" });
//     }
//     const booth = await Booth.findById(req.params.id).populate("expo").populate("exhibitor");
//     if (!booth) {
//       return res.status(404).json({ message: "Booth not found" });
//     }
//     res.status(200).json(booth);
//   } catch (error) {
//     console.error("❌ Error fetching booth:", error);
//     res.status(500).json({ message: "Error fetching booth", error: error.message });
//   }
// }; 



const getBoothById = async (req, res) => {
  try {
    console.log("📌 Received Booth ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.error("❌ Invalid Booth ID format:", req.params.id);
      return res.status(400).json({ message: "Invalid Booth ID format" });
    }

    const booth = await Booth.findById(req.params.id).populate("expo").populate("exhibitor");
    if (!booth) {
      console.error("❌ Booth not found for ID:", req.params.id);
      return res.status(404).json({ message: "Booth not found" });
    }

    res.status(200).json(booth);
  } catch (error) {
    console.error("❌ Error fetching booth:", error);
    res.status(500).json({ message: "Error fetching booth", error: error.message });
  }
};



// ✅ Update booth
const updateBooth = async (req, res) => {
  try {
    const { number, location, expo, exhibitor, boothType, status } = req.body;
    const boothId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(boothId)) {
      return res.status(400).json({ message: "Invalid Booth ID format" });
    }

    const booth = await Booth.findById(boothId);
    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }

    if (number) booth.number = number;
    if (location) booth.location = location;
    if (expo) {
      if (!mongoose.Types.ObjectId.isValid(expo)) {
        return res.status(400).json({ message: "Invalid Expo ID format" });
      }
      const existingExpo = await Expo.findById(expo);
      if (!existingExpo) {
        return res.status(404).json({ message: "Expo not found" });
      }
      booth.expo = new mongoose.Types.ObjectId(expo);
    }
    if (exhibitor) {
      if (!mongoose.Types.ObjectId.isValid(exhibitor)) {
        return res.status(400).json({ message: "Invalid Exhibitor ID format" });
      }
      const existingExhibitor = await Exhibitor.findById(exhibitor);
      if (!existingExhibitor) {
        return res.status(404).json({ message: "Exhibitor not found" });
      }
      booth.exhibitor = new mongoose.Types.ObjectId(exhibitor);
    }
    if (boothType) booth.boothType = boothType;
    if (status) booth.status = status;

    await booth.save();
    res.status(200).json({ message: "Booth updated successfully", booth });
  } catch (error) {
    console.error("❌ Error updating booth:", error);
    res.status(500).json({ message: "Error updating booth", error: error.message });
  }
};

const getBoothsByExpo = async (req, res) => {
  try {
    const { expoId } = req.params; // Expo ID from request params

    if (!mongoose.Types.ObjectId.isValid(expoId)) {
      return res.status(400).json({ message: "Invalid Expo ID format" });
    }

    const booths = await Booth.find({ expo: new mongoose.Types.ObjectId(expoId) }).populate("expo").populate("exhibitor");

    if (!booths.length) {
      return res.status(404).json({ message: "❌ No booths found for this expo." });
    }

    res.status(200).json(booths);
  } catch (error) {
    console.error("❌ Error fetching booths by expo:", error);
    res.status(500).json({ message: "Error fetching booths", error: error.message });
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
      console.error("Error deleting booth:", error);
      res.status(500).json({ message: "Server error" });
  }}
// Add this function in module exports
module.exports = {
  createBooth,
  getAllBooths,
  getBoothById,
  updateBooth,
  getBoothsByExpo, // ✅ Add new function
  deleteBooth,
};

const Booth = require("../Models/booths_model");

// ✅ Create a new Booth
const createBooth = async (req, res) => {
  try {
    const { number, location, expo } = req.body;

    // Validation
    if (!number || !location || !expo) {
      return res.status(400).json({ message: "All fields (number, location, expo) are required" });
    }

    // Check if booth number already exists
    const existingBooth = await Booth.findOne({ number });
    if (existingBooth) {
      return res.status(400).json({ message: "Booth number already exists" });
    }

    const newBooth = new Booth({ number, location, expo });
    await newBooth.save();
    
    res.status(201).json({ message: "Booth created successfully", booth: newBooth });
  } catch (error) {
    console.error("❌ Error creating booth:", error);
    res.status(500).json({ message: "Error creating booth", error: error.message });
  }
};

// ✅ Get all Booths with populated Expo & Exhibitor details
const getAllBooths = async (req, res) => {
  try {
    const booths = await Booth.find()
      .populate("expo", "name date location") 
      .populate("exhibitor", "name company email"); 

    res.status(200).json(booths);
  } catch (error) {
    console.error("❌ Error fetching booths:", error);
    res.status(500).json({ message: "Error fetching booths", error: error.message });
  }
};

// ✅ Get a single Booth by ID
const getBoothById = async (req, res) => {
  try {
    const booth = await Booth.findById(req.params.id)
      .populate("expo", "name date location") 
      .populate("exhibitor", "name company email");

    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }

    res.status(200).json(booth);
  } catch (error) {
    console.error("❌ Error fetching booth:", error);
    res.status(500).json({ message: "Error fetching booth", error: error.message });
  }
};

// ✅ Assign an Exhibitor to a Booth
const assignBooth = async (req, res) => {
  try {
    const { boothId, exhibitorId } = req.body;

    if (!boothId || !exhibitorId) {
      return res.status(400).json({ message: "Booth ID and Exhibitor ID are required" });
    }

    // Find booth and check if it's available
    const booth = await Booth.findById(boothId);
    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }
    if (booth.status !== "Available") {
      return res.status(400).json({ message: "Booth is not available" });
    }

    // Assign exhibitor and update status
    booth.exhibitor = exhibitorId;
    booth.status = "Occupied";
    await booth.save();

    res.status(200).json({ message: "Booth assigned successfully", booth });
  } catch (error) {
    console.error("❌ Error assigning booth:", error);
    res.status(500).json({ message: "Error assigning booth", error: error.message });
  }
};

// ✅ Unassign an Exhibitor from a Booth
const unassignBooth = async (req, res) => {
  try {
    const { boothId } = req.body;

    if (!boothId) {
      return res.status(400).json({ message: "Booth ID is required" });
    }

    // Find the booth and check if it's occupied
    const booth = await Booth.findById(boothId);
    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }
    if (booth.status !== "Occupied") {
      return res.status(400).json({ message: "Booth is not currently occupied" });
    }

    // Unassign exhibitor and update status
    booth.exhibitor = null;
    booth.status = "Available";
    await booth.save();

    res.status(200).json({ message: "Booth unassigned successfully", booth });
  } catch (error) {
    console.error("❌ Error unassigning booth:", error);
    res.status(500).json({ message: "Error unassigning booth", error: error.message });
  }
};

// ✅ Update a Booth by ID
const updateBooth = async (req, res) => {
  try {
    const updatedBooth = await Booth.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBooth) {
      return res.status(404).json({ message: "Booth not found" });
    }

    res.status(200).json({ message: "Booth updated successfully", booth: updatedBooth });
  } catch (error) {
    console.error("❌ Error updating booth:", error);
    res.status(500).json({ message: "Error updating booth", error: error.message });
  }
};

// ✅ Delete a Booth by ID
const deleteBooth = async (req, res) => {
  try {
    const deletedBooth = await Booth.findByIdAndDelete(req.params.id);

    if (!deletedBooth) {
      return res.status(404).json({ message: "Booth not found" });
    }

    res.status(200).json({ message: "Booth deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting booth:", error);
    res.status(500).json({ message: "Error deleting booth", error: error.message });
  }
};

module.exports = {
  createBooth,
  getAllBooths,
  getBoothById,
  assignBooth,
  unassignBooth,
  updateBooth,
  deleteBooth
};

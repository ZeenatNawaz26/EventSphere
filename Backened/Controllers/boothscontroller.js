const Booth = require("../Models/booths_model"); 

// ✅ Create a new Booth
const createBooth = async (req, res) => {
  try {
    const { expo, exhibitor, size, price } = req.body;

    // Validation - Ensure all required fields are present
    if (!expo || !exhibitor || !size || !price) {
      return res.status(400).json({ message: "All fields (expo, exhibitor, size, price) are required" });
    }

    const newBooth = new Booth({ expo, exhibitor, size, price });
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
      .populate("expo", "name date location") // Populate expo details
      .populate("exhibitor", "name company email"); // Populate exhibitor details

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
  updateBooth,
  deleteBooth
};

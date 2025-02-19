const Expo = require("../Models/expos_model")

// ✅ Create a new Expo
exports.createExpo = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const newExpo = new Expo({
      title,
      description,
      date,
      location,
    });

    await newExpo.save();
    res.status(201).json({ message: "Expo created successfully", expo: newExpo });
  } catch (error) {
    console.error("❌ Error creating Expo:", error);
    res.status(500).json({ message: "Error creating Expo", error });
  }
};

// ✅ Get all Expos
exports.getAllExpos = async (req, res) => {
  try {
    const expos = await Expo.find();
    res.status(200).json(expos);
  } catch (error) {
    console.error("❌ Error fetching expos:", error);
    res.status(500).json({ message: "Error fetching expos", error });
  }
};

// ✅ Get a single Expo by ID
exports.getExpoById = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) {
      return res.status(404).json({ message: "Expo not found" });
    }
    res.status(200).json(expo);
  } catch (error) {
    console.error("❌ Error fetching expo:", error);
    res.status(500).json({ message: "Error fetching expo", error });
  }
};

// ✅ Update an Expo by ID
exports.updateExpo = async (req, res) => {
  try {
    const expo = await Expo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expo) {
      return res.status(404).json({ message: "Expo not found" });
    }
    res.status(200).json({ message: "Expo updated successfully", expo });
  } catch (error) {
    console.error("❌ Error updating expo:", error);
    res.status(500).json({ message: "Error updating expo", error });
  }
};

// ✅ Delete an Expo by ID
exports.deleteExpo = async (req, res) => {
  try {
    const expo = await Expo.findByIdAndDelete(req.params.id);
    if (!expo) {
      return res.status(404).json({ message: "Expo not found" });
    }
    res.status(200).json({ message: "Expo deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting expo:", error);
    res.status(500).json({ message: "Error deleting expo", error });
  }
};

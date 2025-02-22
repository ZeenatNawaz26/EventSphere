const Exhibitor = require("../Models/exhibitor_model");
const Booth = require("../Models/booths_model");

// ✅ Exhibitor Registration
const registerExhibitor = async (req, res) => {
  try {
    const exhibitor = new Exhibitor(req.body);
    await exhibitor.save();
    res.status(201).json({ message: "Exhibitor registered successfully", exhibitor });
  } catch (error) {
    console.error("❌ Error registering exhibitor:", error);
    res.status(500).json({ message: "Error registering exhibitor", error });
  }
};

// ✅ Get All Exhibitors
const getAllExhibitors = async (req, res) => {
  try {
    const exhibitors = await Exhibitor.find().populate("assignedBooth");
    res.status(200).json(exhibitors);
  } catch (error) {
    console.error("❌ Error fetching exhibitors:", error);
    res.status(500).json({ message: "Error fetching exhibitors", error });
  }
};

// ✅ Approve or Reject Exhibitor
const updateExhibitorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const exhibitor = await Exhibitor.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!exhibitor) {
      return res.status(404).json({ message: "Exhibitor not found" });
    }
    res.status(200).json({ message: `Exhibitor ${status}`, exhibitor });
  } catch (error) {
    console.error("❌ Error updating exhibitor status:", error);
    res.status(500).json({ message: "Error updating exhibitor status", error });
  }
};

// ✅ Assign Booth to Exhibitor
const assignBooth = async (req, res) => {
  try {
    const { boothId } = req.body;
    const exhibitor = await Exhibitor.findByIdAndUpdate(req.params.id, { assignedBooth: boothId }, { new: true });

    if (!exhibitor) {
      return res.status(404).json({ message: "Exhibitor not found" });
    }

    await Booth.findByIdAndUpdate(boothId, { isAssigned: true });

    res.status(200).json({ message: "Booth assigned successfully", exhibitor });
  } catch (error) {
    console.error("❌ Error assigning booth:", error);
    res.status(500).json({ message: "Error assigning booth", error });
  }
};

module.exports = {
  registerExhibitor,
  getAllExhibitors,
  updateExhibitorStatus,
  assignBooth
};

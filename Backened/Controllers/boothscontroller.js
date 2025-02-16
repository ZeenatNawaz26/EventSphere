const express = require("express");
const Booth = require("../Models/booths_model"); 

// ✅ Create a new Booth
const createBooth = async (req, res) => {
  try {
    const { expoId, exhibitor, size, price } = req.body;
    const newBooth = new Booth({ expoId, exhibitor, size, price });
    await newBooth.save();
    res.status(201).json({ message: "Booth created successfully", booth: newBooth });
  } catch (error) {
    console.error("❌ Error creating booth:", error);
    res.status(500).json({ message: "Error creating booth", error });
  }
};

// ✅ Get all Booths
const getAllBooths = async (req, res) => {
  try {
    const booths = await Booth.find();
    res.status(200).json(booths);
  } catch (error) {
    console.error("❌ Error fetching booths:", error);
    res.status(500).json({ message: "Error fetching booths", error });
  }
};

// ✅ Get a single Booth by ID
const getBoothById = async (req, res) => {
  try {
    const booth = await Booth.findById(req.params.id);
    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }
    res.status(200).json(booth);
  } catch (error) {
    console.error("❌ Error fetching booth:", error);
    res.status(500).json({ message: "Error fetching booth", error });
  }
};

// ✅ Update a Booth by ID
const updateBooth = async (req, res) => {
  try {
    const booth = await Booth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }
    res.status(200).json({ message: "Booth updated successfully", booth });
  } catch (error) {
    console.error("❌ Error updating booth:", error);
    res.status(500).json({ message: "Error updating booth", error });
  }
};

// ✅ Delete a Booth by ID
const deleteBooth = async (req, res) => {
  try {
    const booth = await Booth.findByIdAndDelete(req.params.id);
    if (!booth) {
      return res.status(404).json({ message: "Booth not found" });
    }
    res.status(200).json({ message: "Booth deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting booth:", error);
    res.status(500).json({ message: "Error deleting booth", error });
  }
};

module.exports = {
  createBooth,
  getAllBooths,
  getBoothById,
  updateBooth,
  deleteBooth
};

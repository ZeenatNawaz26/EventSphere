const express = require("express");
const expoController = require("../Controllers/expocontroller"); // Ensure the correct path

const router = express.Router();

// ✅ Create a new Expo
router.post("/create", expoController.createExpo);

// ✅ Get all Expos
router.get("/", expoController.getAllExpos);

// ✅ Get a single Expo by ID
router.get("/:id", expoController.getExpoById);

// ✅ Update an Expo by ID
router.put("/:id", expoController.updateExpo);

// ✅ Delete an Expo by ID
router.delete("/:id", expoController.deleteExpo);

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const boothsController = require("../Controllers/boothscontroller");

// ✅ Middleware to Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid Booth ID" });
    }
    next();
};

// ✅ Routes
router.post("/create", boothsController.createBooth);
router.get("/", boothsController.getAllBooths);
router.get("/:id", validateObjectId, boothsController.getBoothById);
router.put("/:id", validateObjectId, boothsController.updateBooth);
router.delete("/:id", validateObjectId, boothsController.deleteBooth);
router.post("/assign", boothsController.assignBooth);
router.post("/unassign", boothsController.unassignBooth);

module.exports = router;

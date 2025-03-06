// const express = require("express");
// const router = express.Router();
// const boothController = require("../Controllers/boothscontroller"); // ✅ Ensure correct import

// // ✅ Routes should call functions from boothController
// router.post("/create", boothController.createBooth);
// router.get("/all", boothController.getAllBooths);
// router.get("/:id", boothController.getBoothById);
// router.put("/update/:id", boothController.updateBooth);
// router.delete("/delete/:id", boothController.deleteBooth);

// module.exports = router;


const express = require("express");
const router = express.Router();
const boothController = require("../Controllers/boothscontroller");

router.post("/create", boothController.createBooth);
router.get("/all", boothController.getAllBooths);
router.get("/:id", boothController.getBoothById);
router.put("/update/:id", boothController.updateBooth);


router.delete("/delete/:id", boothController.deleteBooth);
router.get("/types", async (req, res) => {
    try {
        const { expoId } = req.query;

        console.log("📌 Received Expo ID:", expoId);

        if (!expoId) {
            console.error("❌ Expo ID missing in request");
            return res.status(400).json({ message: "Expo ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(expoId)) {
            console.error("❌ Invalid Expo ID format:", expoId);
            return res.status(400).json({ message: "Invalid Booth ID format" });
        }

        const objectExpoId = new mongoose.Types.ObjectId(expoId);
        console.log("✅ Converted Expo ID:", objectExpoId);

        const boothTypes = await Booth.find({ expoId: objectExpoId }).distinct("boothNumber");

        if (!boothTypes.length) {
            return res.status(404).json({ message: "No booths found for this expo." });
        }

        res.json(boothTypes);
    } catch (error) {
        console.error("❌ Server error fetching booth types:", error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;

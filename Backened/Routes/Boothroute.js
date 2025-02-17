const express = require("express");
const router = express.Router();
const boothsController = require("../Controllers/boothscontroller");

// ✅ Correct Routing
router.post("/create", boothsController.createBooth);
router.get("/", boothsController.getAllBooths);
router.get("/:id", boothsController.getBoothById);
router.put("/:id", boothsController.updateBooth);
router.delete("/:id", boothsController.deleteBooth);

module.exports = router;

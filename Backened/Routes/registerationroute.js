const express = require("express");
const {
    registerUser,
    getAllRegistrations,
    getExpoRegistrations,
    getUserRegistrations,
    updateRegistrationStatus,
    deleteRegistration
} = require("../Controllers/registerationcontroller");

const router = express.Router();

router.post("/register", registerUser); // ✅ User Registration
router.get("/", getAllRegistrations); // ✅ All Registrations
router.get("/expo/:expoId", getExpoRegistrations); // ✅ Specific Expo Registrations
router.get("/user/:userId", getUserRegistrations); // ✅ User Registrations
router.put("/:registrationId", updateRegistrationStatus); // ✅ Update Status
router.delete("/:registrationId", deleteRegistration); // ✅ Delete Registration




module.exports = router;

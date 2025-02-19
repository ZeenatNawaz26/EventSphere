const Registration = require("../Models/registrations_model");


exports.registerUser = async (req, res) => {
    try {
        const { userId, expoId } = req.body;

        if (!userId || !expoId) {
            return res.status(400).json({ message: "User ID and Expo ID are required" });
        }

        const newRegistration = new Registration({ userId, expoId });
        await newRegistration.save();

        res.status(201).json({ message: "Registration successful", registration: newRegistration });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find().populate("userId expoId");
        res.status(200).json(registrations);
    } catch (error) {
        console.error("❌ Error fetching registrations:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


exports.getExpoRegistrations = async (req, res) => {
    try {
        const { expoId } = req.params;
        const registrations = await Registration.find({ expoId }).populate("userId");
        res.status(200).json(registrations);
    } catch (error) {
        console.error("❌ Error fetching expo registrations:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


exports.getUserRegistrations = async (req, res) => {
    try {
        const { userId } = req.params;
        const registrations = await Registration.find({ userId }).populate("expoId");
        res.status(200).json(registrations);
    } catch (error) {
        console.error("❌ Error fetching user registrations:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


exports.updateRegistrationStatus = async (req, res) => {
    try {
        const { registrationId } = req.params;
        const { status } = req.body;

        if (!["pending", "approved"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedRegistration = await Registration.findByIdAndUpdate(
            registrationId,
            { status },
            { new: true }
        );

        if (!updatedRegistration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(200).json({ message: "Registration status updated", registration: updatedRegistration });
    } catch (error) {
        console.error("❌ Error updating registration:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


exports.deleteRegistration = async (req, res) => {
    try {
        const { registrationId } = req.params;
        const deletedRegistration = await Registration.findByIdAndDelete(registrationId);

        if (!deletedRegistration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(200).json({ message: "Registration deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting registration:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

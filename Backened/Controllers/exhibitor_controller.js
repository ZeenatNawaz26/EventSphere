const mongoose = require("mongoose");
const Exhibitor = require("../Models/exhibitor_model");
const Booth = require("../Models/booths_model");
const Expo = require("../Models/expos_model");

// ✅ Register a New Exhibitor
const registerExhibitor = async (req, res) => {
    try {
        console.log("Received Exhibitor Data:", req.body);
        const { companyName, contactPerson, email, phone, expoId, boothPreference } = req.body;

        // Validate required fields
        if (!companyName || !contactPerson || !email || !phone || !expoId || !boothPreference) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate expoId format
        if (!mongoose.Types.ObjectId.isValid(expoId)) {
            return res.status(400).json({ message: "Invalid expoId format" });
        }

        // Check if the Expo exists
        const expoExists = await Expo.findById(expoId);
        if (!expoExists) {
            return res.status(404).json({ message: "Expo not found" });
        }

        // Find an available booth matching the preference
        const booth = await Booth.findOne({
            boothType: boothPreference, // Match by booth type
            status: "Available",
            expo: expoId // Ensure the booth belongs to the correct expo
        });

        if (!booth) {
            return res.status(400).json({ message: `No available booths for preference: ${boothPreference}` });
        }

        // Register the exhibitor
        const newExhibitor = new Exhibitor({
            companyName,
            contactPerson,
            email,
            phone,
            expoId,
            boothPreference,
            assignedBooth: booth._id // Assign the booth to the exhibitor
        });

        await newExhibitor.save();

        // Update booth status to "Occupied"
        booth.status = "Occupied";
        booth.exhibitor = newExhibitor._id;
        await booth.save();

        res.status(201).json({ message: "Exhibitor registered successfully!", exhibitor: newExhibitor });

    } catch (error) {
        console.error("Error registering exhibitor:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Get All Exhibitors
const getAllExhibitors = async (req, res) => {
    try {
        const exhibitors = await Exhibitor.find().populate("assignedBooth");
        res.status(200).json(exhibitors);
    } catch (error) {
        console.error("❌ Error fetching exhibitors:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Update Exhibitor
const updateExhibitor = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, contactPerson, email, phone, boothPreference } = req.body;

        // Validate exhibitor ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Exhibitor ID" });
        }

        // Find the exhibitor
        const exhibitor = await Exhibitor.findById(id);
        if (!exhibitor) {
            return res.status(404).json({ message: "Exhibitor not found" });
        }

        // Update exhibitor details
        exhibitor.companyName = companyName || exhibitor.companyName;
        exhibitor.contactPerson = contactPerson || exhibitor.contactPerson;
        exhibitor.email = email || exhibitor.email;
        exhibitor.phone = phone || exhibitor.phone;

        // Update booth preference if provided
        if (boothPreference && boothPreference !== exhibitor.boothPreference) {
            const newBooth = await Booth.findOne({
                boothType: boothPreference,
                status: "Available",
                expo: exhibitor.expoId
            });

            if (!newBooth) {
                return res.status(400).json({ message: "No available booths for this preference" });
            }

            // Free the previous booth
            if (exhibitor.assignedBooth) {
                await Booth.findByIdAndUpdate(exhibitor.assignedBooth, { status: "Available", exhibitor: null });
            }

            // Assign the new booth
            newBooth.status = "Occupied";
            newBooth.exhibitor = exhibitor._id;
            await newBooth.save();
            exhibitor.assignedBooth = newBooth._id;
            exhibitor.boothPreference = boothPreference;
        }

        await exhibitor.save();
        res.status(200).json({ message: "Exhibitor updated successfully", exhibitor });

    } catch (error) {
        console.error("❌ Error updating exhibitor:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { registerExhibitor, getAllExhibitors, updateExhibitor };
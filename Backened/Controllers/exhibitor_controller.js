const mongoose = require("mongoose");
const Exhibitor = require("../Models/exhibitor_model");
const Booth = require("../Models/booths_model"); // Fixed typo in import

// ✅ Register a New Exhibitor
const registerExhibitor = async (req, res) => {
    try {
        console.log("Received Exhibitor Data:", req.body);
        const { companyName, contactPerson, email, phone, expoId, boothPreference } = req.body;

        if (!companyName || !contactPerson || !email || !phone || !expoId || !boothPreference) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Validate expoId format
        if (!mongoose.Types.ObjectId.isValid(expoId)) {
            return res.status(400).json({ message: "Invalid expoId format" });
        }

        // ✅ Debug: Check available booths before assigning
        const availableBooths = await Booth.find({ status: "Available", expo: expoId });
        console.log("Available Booths:", availableBooths);

        // ✅ Find a booth by booth number (not name)
        const booth = await Booth.findOne({
            number: boothPreference, 
            status: "Available",
            expo: expoId 
        });

        if (!booth) {
            return res.status(400).json({ message: "No available booths for this preference" });
        }

        // ✅ Register the exhibitor
        const newExhibitor = new Exhibitor({
            companyName,
            contactPerson,
            email,
            phone,
            expoId,
            assignedBooth: booth._id // Correctly assign booth
        });

        await newExhibitor.save();

        // ✅ Update booth status
        booth.status = "Occupied";
        booth.exhibitor = newExhibitor._id;
        await booth.save();

        res.status(201).json({ message: "Exhibitor registered successfully!" });

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

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Exhibitor ID" });
        }

        const exhibitor = await Exhibitor.findById(id);
        if (!exhibitor) {
            return res.status(404).json({ message: "Exhibitor not found" });
        }

        // ✅ Find an available booth if preference changed
        if (boothPreference && boothPreference !== exhibitor.assignedBooth) {
            const newBooth = await Booth.findOne({ number: boothPreference, status: "Available" });
            if (!newBooth) {
                return res.status(400).json({ message: "No available booths for this preference" });
            }

            // ✅ Free previous booth
            if (exhibitor.assignedBooth) {
                await Booth.findByIdAndUpdate(exhibitor.assignedBooth, { status: "Available", exhibitor: null });
            }

            // ✅ Assign new booth
            newBooth.status = "Occupied";
            newBooth.exhibitor = exhibitor._id;
            await newBooth.save();
            exhibitor.assignedBooth = newBooth._id;
        }

        // ✅ Update Exhibitor Details
        exhibitor.companyName = companyName || exhibitor.companyName;
        exhibitor.contactPerson = contactPerson || exhibitor.contactPerson;
        exhibitor.email = email || exhibitor.email;
        exhibitor.phone = phone || exhibitor.phone;

        await exhibitor.save();

        res.status(200).json({ message: "Exhibitor updated successfully", exhibitor });
    } catch (error) {
        console.error("❌ Error updating exhibitor:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { registerExhibitor, getAllExhibitors, updateExhibitor };

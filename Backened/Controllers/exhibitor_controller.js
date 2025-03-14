const mongoose = require("mongoose");
const Exhibitor = require("../Models/exhibitor_model");
const Booth = require("../Models/booths_model");
const Expo = require("../Models/expos_model");

// ✅ Register a New Exhibitor
const findAvailableBooth = async (boothPreference, expoId) => {
    console.log(`🔍 Searching for booth with type: ${boothPreference} in Expo ID: ${expoId}`);

    try {
        const booth = await Booth.findOne({
            boothType: boothPreference,
            status: "Available", 
            expo: new mongoose.Types.ObjectId(expoId) // Ensure matching with ObjectId
        });

        if (!booth) {
            console.warn(`⚠️ No available booths found for type: ${boothPreference}`);
            return null;
        }

        console.log(`✅ Found booth: ${booth.number}`);
        return booth;
    } catch (error) {
        console.error("❌ Error finding booth:", error);
        throw new Error("Error finding booth");
    }
};


const registerExhibitor = async (req, res) => {
    const { companyName, contactPerson, email, phone, boothPreference, expoId } = req.body;

    console.log(`📩 Received Request:`, req.body);

    if (!companyName || !contactPerson || !email || !phone || !boothPreference || !expoId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const booth = await findAvailableBooth(boothPreference, expoId);
        if (!booth) {
            return res.status(404).json({ message: `No available booths for preference: ${boothPreference}` });
        }

        const exhibitor = new Exhibitor({
            companyName,
            contactPerson,
            email,
            phone,
            boothPreference,
            expo: expoId,
            booth: booth._id
        });

        await exhibitor.save();

        // Update booth status to "Allocated"
        booth.status = "Allocated";
        booth.exhibitor = exhibitor._id;
        await booth.save();

        console.log("✅ Exhibitor Registered Successfully");
        res.status(201).json(exhibitor);
    } catch (error) {
        console.error("❌ Error registering exhibitor:", error);
        res.status(500).json({ error: "Server error" });
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

module.exports = { registerExhibitor, getAllExhibitors, updateExhibitor,  findAvailableBooth};
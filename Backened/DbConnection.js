require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const db_url = process.env.MONGO_URI; // Use correct environment variable name

if (!db_url) {
    console.log("❌ URL not found in environment variables");
} else {
    console.log(`✅ Connecting to MongoDB...`);
}

const connection = async function () {
    try {
        await mongoose.connect(db_url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connection Established Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
};

module.exports = connection;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/Userroutes"); // ✅ Ensure lowercase folder name
const boothRoutes = require("./Routes/Boothroute"); // ✅ Ensure lowercase & correct spelling


const app = express();
app.use(express.json());
app.use(cors());

// ✅ Correct Route Registration
app.use("/api/users", userRoutes);
// Mount Booth Routes
app.use("/api/booths", boothRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Database Connection Failed:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

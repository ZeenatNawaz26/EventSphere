const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const dashboardRoute = require("./Routes/Dashboardroutes");
const userRoutes = require("./Routes/Userroutes");
const boothRoutes = require("./Routes/Boothroute");
const expoRoutes = require("./Routes/exporoute");
const registrationRoutes = require("./Routes/registerationroute");
const scheduleRoutes = require("./Routes/scheduleroute");
const exhibitorRoutes = require("./Routes/exhibitor_routes");
const attendeeRoutes = require("./Routes/attendee_routes");
const analyticsRoutes = require("./Routes/analytics_routes");
const messageRoutes = require("./Routes/messageRoutes");
const eventRoutes = require("./Routes/event_route");
const settingsRoutes = require("./Routes/settings_route");
const notificationRoutes = require("./Routes/notificationroute");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use("/api/users", userRoutes);
app.use("/api/booths", boothRoutes);
app.use("/api/expos", expoRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/exhibitors", exhibitorRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/notifications", notificationRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Database Connection Failed:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

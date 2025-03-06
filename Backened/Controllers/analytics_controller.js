const Attendee = require("../Models/attendee_model");
const Booth = require("../Models/booths_model");
const Session = require("../Models/session_model");

// 📊 Attendee Engagement
const getAttendeeEngagement = async (req, res) => {
    try {
        console.log("🔄 Fetching Attendee Engagement...");
        const engagementData = await Attendee.aggregate([
            { $group: { _id: "$event", totalAttendees: { $sum: 1 } } } // eventId corrected to event
        ]);
        console.log("✅ Attendee Engagement Data:", engagementData);
        res.json(engagementData);
    } catch (error) {
        console.error("❌ Error fetching attendee engagement:", error);
        res.status(500).json({ message: "Error fetching attendee engagement", error });
    }
};

// 🚪 Booth Traffic
// const getBoothTraffic = async (req, res) => {
//     try {
//         console.log("🔄 Fetching Booth Traffic...");
//         const trafficData = await Booth.aggregate([
//             { $group: { _id: "$_id", totalVisitors: { $sum: "$visitorCount" } } } // boothId corrected
//         ]);
//         console.log("✅ Booth Traffic Data:", trafficData);
//         res.json(trafficData);
//     } catch (error) {
//         console.error("❌ Error fetching booth traffic:", error);
//         res.status(500).json({ message: "Error fetching booth traffic", error });
//     }
// };
// 🚪 Booth Traffic
const getBoothTraffic = async (req, res) => {
  try {
      console.log("🔄 Fetching Booth Traffic...");
      const trafficData = await Booth.aggregate([
          { $group: { _id: "$_id", totalVisitors: { $sum: { $ifNull: ["$visitorCount", 0] } } } }
      ]);
      console.log("✅ Booth Traffic Data:", trafficData);
      res.json(trafficData);
  } catch (error) {
      console.error("❌ Error fetching booth traffic:", error);
      res.status(500).json({ message: "Error fetching booth traffic", error });
  }
};

// 🎤 Session Popularity
const getSessionPopularity = async (req, res) => {
  try {
      console.log("🔄 Fetching Session Popularity...");
      const sessionData = await Session.aggregate([
          { $group: { _id: "$_id", totalAttendees: { $sum: { $ifNull: ["$attendeeCount", 0] } } } }
      ]);
      console.log("✅ Session Popularity Data:", sessionData);
      res.json(sessionData);
  } catch (error) {
      console.error("❌ Error fetching session popularity:", error);
      res.status(500).json({ message: "Error fetching session popularity", error });
  }
};

// 🎤 Session Popularity
// const getSessionPopularity = async (req, res) => {
//     try {
//         console.log("🔄 Fetching Session Popularity...");
//         const sessionData = await Session.aggregate([
//             { $group: { _id: "$_id", totalAttendees: { $sum: "$attendeeCount" } } } // sessionId corrected
//         ]);
//         console.log("✅ Session Popularity Data:", sessionData);
//         res.json(sessionData);
//     } catch (error) {
//         console.error("❌ Error fetching session popularity:", error);
//         res.status(500).json({ message: "Error fetching session popularity", error });
//     }
// };

// 📡 Real-time Analytics
// const getRealTimeAnalytics = async (req, res) => {
//     try {
//         console.log("🔄 Fetching Real-Time Analytics...");
//         const liveData = {
//             liveAttendees: await Attendee.countDocuments(),
//             liveBoothVisitors: await Booth.countDocuments({ visitorCount: { $gt: 0 } })
//         };
//         console.log("✅ Real-Time Analytics Data:", liveData);
//         res.json(liveData);
//     } catch (error) {
//         console.error("❌ Error fetching real-time analytics:", error);
//         res.status(500).json({ message: "Error fetching real-time analytics", error });
//     }
// };

// 📡 Real-time Analytics
const getRealTimeAnalytics = async (req, res) => {
  try {
      console.log("🔄 Fetching Real-Time Analytics...");

      const liveAttendees = await Attendee.countDocuments({});
      const liveBoothVisitors = await Booth.aggregate([
          { $match: { visitorCount: { $gt: 0 } } },
          { $group: { _id: null, totalVisitors: { $sum: "$visitorCount" } } }
      ]);

      console.log("✅ Real-Time Data:", { liveAttendees, liveBoothVisitors });

      res.json({
          liveAttendees,
          liveBoothVisitors: liveBoothVisitors.length > 0 ? liveBoothVisitors[0].totalVisitors : 0
      });

  } catch (error) {
      console.error("❌ Error fetching real-time analytics:", error);
      res.status(500).json({ message: "Error fetching real-time analytics", error });
  }
};


module.exports = { getAttendeeEngagement, getBoothTraffic, getSessionPopularity, getRealTimeAnalytics };

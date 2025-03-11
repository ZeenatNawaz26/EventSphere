import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/navbar";
import Dashboard from "../../Pages/Dashboard";
import ExpoManagement from "../../Pages/ExpoManagement";
import BoothAllocation from "../../Pages/BoothAllocation";
import ExhibitorManagement from "../../Pages/ExhibitorManagement";
import AttendeeManagement from "../../Pages/AttendeeManagement";
import ScheduleManagement from "../../Pages/ScheduleManagement";
import UserManagement from "../../Pages/UserManagement";
import Notifications from "../../Pages/Notifications";
import Messages from "../../Pages/Messages";
import AnalyticsReporting from "../../Pages/AnalyticsReporting";
import Settings from "../../Pages/Settings";
import AdminFeedback from "../../Pages/Feedback & Support";

const AdminLayout = () => {
  console.log("✅ AdminLayout Component Loaded");

  const [role, setRole] = useState(localStorage.getItem("role")); // ✅ Pehle se value set kar do

  useEffect(() => {
    console.log("🔵 Fetching user role...");
    const storedRole = localStorage.getItem("role");

    if (storedRole && storedRole !== role) {
      // ✅ Role tab update ho jab change ho
      console.log("🟢 Role found:", storedRole);
      setRole(storedRole);
    }
  }, []); // ✅ Empty dependency array to avoid infinite loop

  if (!role) {
    console.log("🟡 Showing loading screen...");
    return <div className="loading">Loading...</div>;
  }

  if (role !== "admin") {
    console.log("🔴 User is not an admin! Redirecting to /");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Rendering AdminLayout Component...");

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <main>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="event-management" element={<ExpoManagement />} />
            <Route path="booth-allocation" element={<BoothAllocation />} />
            <Route path="exhibitor-management" element={<ExhibitorManagement />} />
            <Route path="attendee-management" element={<AttendeeManagement />} />
            <Route path="schedule-management" element={<ScheduleManagement />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="messages" element={<Messages />} />
            <Route path="analytics-reporting" element={<AnalyticsReporting />} />
            <Route path="settings" element={<Settings />} />
            <Route path="feedback-support" element={<AdminFeedback />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

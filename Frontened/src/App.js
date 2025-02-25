import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Pages/Login";
import Registeration from "./Pages/Register";
import Sidebar from "./Components/sidebar/sidebar";
import Navbar from "./Components/navbar/navbar";
import Dashboard from "./Pages/Dashboard";
import ExpoManagement from "./Pages/ExpoManagement";
import BoothAllocation from "./Pages/BoothAllocation";
import ExhibitorManagement from "./Pages/ExhibitorManagement";
import ExpoForm from "./Pages/ExpoForm";
import AttendeeManagement from "./Pages/AttendeeManagement";
import ScheduleManagement from "./Pages/ScheduleManagement";
import AnalyticsReporting from "./Pages/AnalyticsReporting";
import Messages from "./Pages/Messages";
import UserManagement from "./Pages/UserManagement";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role") || "guest"; // Ensure it’s getting stored & retrieved correctly


  // ✅ Debugging localStorage values
  console.log("🔍 User ID from localStorage:", userId);
  console.log("🔍 Current Role from LocalStorage:", localStorage.getItem("role"));


  // ✅ Set default role if null or undefined
  if (!role) {
    role = "guest"; // Default role
    localStorage.setItem("role", role);
    console.log("⚙️ Role was null, set to:", role);
  }

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route
          path="/login"
          element={
            userId ? (
              (console.log("✅ Redirecting to Dashboard"), <Navigate to="/dashboard" />)
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userId ? (
              (console.log("✅ Redirecting to Dashboard"), <Navigate to="/dashboard" />)
            ) : (
              <Registeration />
            )
          }
        />

        {/* ✅ Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout role={role} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// ✅ Main Layout with Sidebar & Navbar
const MainLayout = ({ role }) => {
  console.log("🛠️ Rendering MainLayout with Role:", role);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event-management" element={<ExpoManagement />} />
            <Route path="/expo/create" element={<ExpoForm />} />
            <Route path="/expo/edit/:id" element={<ExpoForm />} />
            <Route path="/booth-allocation" element={<BoothAllocation />} />
            <Route
              path="/exhibitor-management"
              element={<ExhibitorManagement />}
            />
            <Route path="/attendee-management" element={<AttendeeManagement />} />
            <Route path="/schedule-management" element={<ScheduleManagement />} />
            <Route
              path="/analytics-reporting/:expoId"
              element={<AnalyticsReporting />}
            />
            <Route path="/messages/:expoId" element={<Messages />} />

            {/* ✅ Role-Based Access Debugging */}
            {role === "admin" ? (
              <>
                {console.log("✅ Role is Admin: Accessing User Management")}
                <Route path="/user-management" element={<UserManagement />} />
              </>
            ) : (
              <>
                {console.log("❌ Role is NOT Admin: Redirecting to Dashboard")}
                <Route path="/user-management" element={<Navigate to="/dashboard" />} />
              </>
            )}

            {/* ✅ Default route handling */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;

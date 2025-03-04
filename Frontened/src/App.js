import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AddCircle, Edit } from '@mui/icons-material';

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
import Sidebar2 from "./Components/sidebar/Sidebar2";
import Navbar from "./Components/navbar/navbar";

import Header from './Components/navbar/Header';
import Footer from './Components/navbar/Footer';
import About from "./Pages/About"
import Home from "./Pages/Home"
import BuyTicket from "./Pages/BuyTicket"
import Contact from "./Pages/Contact"
import Schedule from "./Pages/Schedule"
import Speaker from "./Pages/Speaker"
import Sponsor from "./Pages/Sponsor"


import Dashboard from "./Pages/Dashboard";
 import Dashboard from "./Pages/user_panel/User_Dashboard1";
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

import ExpoRegistration from "./Pages/user_panel/ExpoRegistration";

function App() {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role") || "guest"; // Ensure it’s getting stored & retrieved correctly

  // ✅ Debugging localStorage values
  console.log("🔍 User ID from localStorage:", userId);
  console.log("🔍 Current Role from LocalStorage:", role);

  // ✅ Set default role if null or undefined
  if (role === null) {
    role = "guest"; // Default role
    localStorage.setItem("role", role);
    console.log("⚙️ Role was null, set to:", role);
  }

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route
          path="/"
          element={
            userId ? (
              (console.log("✅ Redirecting to Dashboard"), <Navigate to="/dashboard" />)
            ) : (
              <HomeWithLayout />
            )
          }
        />

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

// ✅ Home Page Layout with Header and Footer
const HomeWithLayout = () => {
  return (
    <div className="app-container">
      <Header /> {/* Include Header */}
      <Home />   {/* Home Page Content */}
      <Footer /> {/* Include Footer */}
    </div>
  );
};

// ✅ Main Layout with Sidebar & Navbar
const MainLayout = ({ role }) => {
  console.log("🛠️ Rendering MainLayout with Role:", role);

  return (
    <div className="app-container">
      <Sidebar />
      <Sidebar2 />
      <div className="content">
        <Navbar />
        <Header />
        <Footer />
        <main>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/speaker' element={<Speaker />} />
            <Route path='/schedule' element={<Schedule />} />
            <Route path='/sponsors' element={<Sponsor />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/buy-ticket' element={<BuyTicket />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard1" element={<Dashboard1/>} />
            <Route path="/event-management" element={<ExpoManagement />} />
            <Route path="/expo/create" element={<ExpoForm />} />
            <Route path="/expo/edit/:id" element={<ExpoForm />} />
            <Route path="/booth-allocation" element={<BoothAllocation />} />
            <Route path="/exhibitor-management" element={<ExhibitorManagement />} />
            <Route path="/attendee-management" element={<AttendeeManagement />} />
            <Route path="/schedule-management" element={<ScheduleManagement />} />
            <Route path="/analytics-reporting/:expoId" element={<AnalyticsReporting />} />
            <Route path="/messages/:expoId" element={<Messages />} />

            <Route path="/exporegistration" element={<ExpoRegistration />} />

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

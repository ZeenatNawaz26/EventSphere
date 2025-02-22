import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login"; // Correct path to your Login component
import Registeration from "./Pages/Register"; // Correct path to your Registration component
import Sidebar from "./Components/sidebar/sidebar";
import Navbar from "./Components/navbar/navbar";
import Dashboard from "./Pages/Dashboard";
import ExpoManagement from "./Pages/ExpoManagement";
import BoothAllocation from "./Pages/BoothAllocation";

import ExpoForm from "./Pages/ExpoForm";

function App() {
 
  return (
    <Router>
      <div className="d-flex">
      <Sidebar />
      <Navbar/>
        <div className="flex-grow-1">
          <Routes>
          
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event-management" element={<ExpoManagement />} />
            <Route path="/expo/create" element={<ExpoForm />} />
            <Route path="/expo/edit/:id" element={<ExpoForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registeration />} />
            <Route path="/booth-allocation" element={< BoothAllocation/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

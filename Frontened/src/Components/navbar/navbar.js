import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt, FaHome, FaUsers } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // Get user role

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userId"); // ✅ Correct key
    localStorage.removeItem("role");
    navigate("/login"); // Redirect to login page
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Admin Dashboard</h2>
      </div>

      <div className="navbar-right">
        {/* Home Link */}
        <Link to="/dashboard" className="nav-link">
          <FaHome /> Home
        </Link>

        

        {/* Profile Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">
            <FaUserCircle className="user-icon" /> Profile
          </button>
          <div className="dropdown-content">
            <Link to="/settings">
              <FaCog /> Settings
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

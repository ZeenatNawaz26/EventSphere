import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Admin Dashboard</h2>
      </div>

      <div className="navbar-right">
        <Link to="/dashboard" className="nav-link">
          <FaHome /> Home
        </Link>
        <div className="dropdown">
          <button className="dropbtn">
            <FaUserCircle className="user-icon" /> Profile
          </button>
          <div className="dropdown-content">
            <Link to="/settings">
              <FaCog /> Settings
            </Link>
            <Link to="/logout">
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaUserShield, FaCalendarAlt, FaBriefcase, FaUsers, FaClipboardList, FaFileAlt, FaEnvelope, FaCog, FaCommentDots } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <FaChartPie /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/event-management">
            <FaCalendarAlt /> Event Management
          </Link>
        </li>
        <li>
          <Link to="/booth-allocation">
            <FaBriefcase /> Booth Allocation
          </Link>
        </li>
        <li>
          <Link to="/exhibitor-management">
            <FaUsers /> Exhibitor Management
          </Link>
        </li>
        <li>
          <Link to="/attendee-management">
            <FaClipboardList /> Attendee Management
          </Link>
        </li>
        <li>
          <Link to="/schedule-management">
            <FaFileAlt /> Schedule Management
          </Link>
        </li>
        <li>
          <Link to="/analytics-reporting">
            <FaChartPie /> Analytics & Reporting
          </Link>
        </li>
        <li>
          <Link to="/communication-notifications">
            <FaEnvelope /> Communication & Notifications
          </Link>
        </li>
        <li>
          <Link to="/user-management">
            <FaUserShield /> User Management
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog /> Settings
          </Link>
        </li>
        <li>
          <Link to="/feedback-support">
            <FaCommentDots /> Feedback & Support
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

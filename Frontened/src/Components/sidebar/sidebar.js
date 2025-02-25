import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUserShield,
  FaCalendarAlt,
  FaBriefcase,
  FaUsers,
  FaClipboardList,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaCommentDots,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = ({ expoId, role }) => {
  const validExpoId = expoId || "defaultExpoId";
  const [userRole, setUserRole] = useState(role || localStorage.getItem("role") || "guest");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!role && storedRole) {
      setUserRole(storedRole);
    }
  }, [role]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard">
            <FaChartPie /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/event-management">
            <FaCalendarAlt /> Expo Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/booth-allocation">
            <FaBriefcase /> Booth Allocation
          </NavLink>
        </li>
        <li>
          <NavLink to="/exhibitor-management">
            <FaUsers /> Exhibitor Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/attendee-management">
            <FaClipboardList /> Attendee Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/schedule-management">
            <FaFileAlt /> Schedule Management
          </NavLink>
        </li>
        <li>
          <NavLink to={`/analytics-reporting/${validExpoId}`}>
            <FaChartPie /> Analytics & Reporting
          </NavLink>
        </li>
        <li>
          <NavLink to={`/messages/${validExpoId}`}>
            <FaEnvelope /> Communication & Notifications
          </NavLink>
        </li>
        {userRole === "admin" ? (
          <li>
            <NavLink to="/user-management">
              <FaUserShield /> User Management
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink to="/settings">
            <FaCog /> Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/feedback-support">
            <FaCommentDots /> Feedback & Support
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

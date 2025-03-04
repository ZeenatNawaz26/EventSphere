

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
                <h2>User Panel</h2>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/dashboard">
                        <FaChartPie /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/event-management">
                        <FaCalendarAlt /> Login $ Registration
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/booth-allocation">
                        <FaBriefcase /> Expo Registration
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/exhibitor-management">
                        <FaUsers /> Profile Management
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/attendee-management">
                        <FaClipboardList /> Booth Selection
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/schedule-management">
                        <FaFileAlt /> Schedule & Session
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/analytics-reporting/${validExpoId}`}>
                        <FaChartPie /> Communication
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to="/feedback-support">
                        <FaCommentDots /> Reports & Analytics
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

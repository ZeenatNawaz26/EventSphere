// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaChartPie,
//   FaUserShield,
//   FaCalendarAlt,
//   FaBriefcase,
//   FaUsers,
//   FaClipboardList,
//   FaFileAlt,
//   FaEnvelope,
//   FaCog,
//   FaCommentDots,
// } from "react-icons/fa";
// import "./sidebar.css";

// const Sidebar = ({ expoId, role }) => {
//   const [userRole, setUserRole] = useState(role || localStorage.getItem("role") || "guest");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (!role && storedRole) {
//       setUserRole(storedRole);
//     }
//   }, [role]);

//   // ✅ Get Expo ID from URL or Local Storage
//   const validExpoId = expoId || localStorage.getItem("selectedExpoId") || "defaultExpoId";

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h2>Admin Panel</h2>
//       </div>
//       <ul className="sidebar-menu">
//         <li>
//           <NavLink to="/dashboard">
//             <FaChartPie /> Dashboard
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/event-management">
//             <FaCalendarAlt /> Expo Management
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/booth-allocation">
//             <FaBriefcase /> Booth Allocation
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/exhibitor-management">
//             <FaUsers /> Exhibitor Management
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/attendee-management">
//             <FaClipboardList /> Attendee Management
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/schedule-management">
//             <FaFileAlt /> Schedule Management
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/analytics-reporting`}>
//             <FaChartPie /> Analytics & Reporting
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/messages`}>
//             <FaEnvelope /> Communication & Notifications
//           </NavLink>
//         </li>
//         {userRole === "admin" && (
//           <li>
//             <NavLink to="/user-management">
//               <FaUserShield /> User Management
//             </NavLink>
//           </li>
//         )}
//         {/* <li>
//           <NavLink to="/settings">
//             <FaCog /> Settings
//           </NavLink>
//         </li> */}
//         <li>
//           <NavLink to="/feedback-support">
//             <FaCommentDots /> Feedback & Support
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
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
  FaCommentDots,
  FaSearch,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = ({ expoId, role }) => {
  const [userRole, setUserRole] = useState(role || localStorage.getItem("role") || "guest");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole && storedRole !== userRole) {
      setUserRole(storedRole);
    }
  }, [role]); // ✅ Only re-run when role changes

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>
          {userRole === "admin"
            ? "Admin Panel"
            : userRole === "exhibitor"
            ? "Exhibitor Panel"
            : "Attendee Panel"}
        </h2>
      </div>
      <ul className="sidebar-menu">
        {/* ✅ Admin Panel */}
        {userRole === "admin" && (
          <>
            <li>
              <NavLink to="/admin/dashboard">
                <FaChartPie /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/event-management">
                <FaCalendarAlt /> Expo Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/booth-allocation">
                <FaBriefcase /> Booth Allocation
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/exhibitor-management">
                <FaUsers /> Exhibitor Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/attendee-management">
                <FaClipboardList /> Attendee Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/schedule-management">
                <FaFileAlt /> Schedule Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/analytics-reporting">
                <FaChartPie /> Analytics & Reporting
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/messages">
                <FaEnvelope /> Communication & Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/user-management">
                <FaUserShield /> User Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/feedback-support">
                <FaCommentDots /> Feedback & Support
              </NavLink>
            </li>
          </>
        )}

        {/* ✅ Exhibitor Panel */}
        {userRole === "exhibitor" && (
          <>
            <li>
              <NavLink to="/exhibitor/dashboard">
                <FaChartPie /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/exhibitor/expo-registration">
                <FaCalendarAlt /> Expo Registration
              </NavLink>
            </li>
            <li>
              <NavLink to="/exhibitor/profile">
                <FaUsers /> Profile Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/booth-selection">
                <FaBriefcase /> Booth Selection
              </NavLink>
            </li>
            <li>
              <NavLink to="/exhibitor/schedule-sessions">
                <FaFileAlt /> Schedule & Sessions
              </NavLink>
            </li>
            <li>
              <NavLink to="/exhibitor/messages">
                <FaEnvelope /> Communication
              </NavLink>
            </li>
            <li>
              <NavLink to="/exhibitor/analytics">
                <FaChartPie /> Reports & Analytics
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;

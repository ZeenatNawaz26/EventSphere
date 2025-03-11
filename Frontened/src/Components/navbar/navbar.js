// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaUserCircle, FaCog, FaSignOutAlt, FaHome, FaUsers } from "react-icons/fa";
// import "./navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Toggle dropdown
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <h2 className="logo">Admin Dashboard</h2>
//       </div>

//       <div className="navbar-right">
//         {/* Home Link */}
//         <Link to="/dashboard" className="nav-link">
//           <FaHome /> Home
//         </Link>

//         {/* Role-based Links
//         {role === "admin" && (
//           <Link to="/users" className="nav-link">
//             <FaUsers /> Manage Users
//           </Link>
//         )} */}

//         {/* Profile Dropdown */}
//         <div className="dropdown" onClick={toggleDropdown}>
//           <button className="dropbtn">
//             <FaUserCircle className="user-icon" /> Profile
//           </button>
//           {dropdownOpen && (
//             <div className="dropdown-content">
//               <Link to="/settings">
//                 <FaCog /> Settings
//               </Link>
//               <button onClick={handleLogout} className="logout-btn">
//                 <FaSignOutAlt /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt, FaHome, FaUsers, FaBell } from "react-icons/fa";
import axios from "axios";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifDropdown, setNotifDropdown] = useState(false);

  useEffect(() => {
    if (!userId) return;
  
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/messages/notifications/${userId}`);

        console.log("✅ Notifications fetched:", response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error("❌ Error fetching notifications:", error.response?.data || error.message);
      }
    };
  
    fetchNotifications();
  }, [userId]); // ✅ Add userId as dependency
  

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleNotifDropdown = () => setNotifDropdown(!notifDropdown);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.put(`http://localhost:8000/api/messages/mark-as-read/${messageId}`);
      setNotifications(notifications.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Admin Dashboard</h2>
      </div>

      <div className="navbar-right">
        <Link to="/admin/dashboard" className="nav-link">
          <FaHome /> Home
        </Link>

        {/* Notification Bell */}
        <div className="notification-container" onClick={toggleNotifDropdown}>
          <button className="notification-btn">
            <FaBell className="bell-icon" />
            {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          </button>
          {notifDropdown && notifications.length > 0 && (
            <div className="dropdown notif-dropdown">
              {notifications.map((msg) => (
                <div key={msg._id} className="notification-item">
                  <p>
                    <strong>{msg.senderId?.name || "Unknown"}</strong>: {msg.message}
                  </p>
                  <button onClick={() => markAsRead(msg._id)}>Mark as Read</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown" onClick={toggleDropdown}>
          <button className="dropbtn">
            <FaUserCircle className="user-icon" /> Profile
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/settings">
                <FaCog /> Settings
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Sidebar2 from "../sidebar/Sidebar2";
// import Navbar from "../navbar/navbar";
// import Footer from "../navbar/Footer";
// import User_Dashboard1 from "../../Pages/user_panel/User_Dashboard1";
// import ExpoRegistration from "../../Pages/user_panel/ExpoRegistration";
// import BuyTicket from "../../Pages/BuyTicket";
// import Contact from "../../Pages/Contact";

// const UserLayout = () => {
//   const userId = localStorage.getItem("userId");
//   if (!userId) return <Navigate to="/login" />;

//   return (
//     <div className="user-container">
//       <Sidebar2 />
//       <div className="content">
//         <Navbar />
//         <main>
//           <Routes>
//             <Route path="dashboard" element={<User_Dashboard1 />} />
//             <Route path="exporegistration" element={<ExpoRegistration />} />
//             <Route path="buy-ticket" element={<BuyTicket />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="*" element={<Navigate to="dashboard" replace />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default UserLayout;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/navbar";

// Ensure these imports exist and are correctly exported
import ExhibitorDashboard from "../../Pages/Exhibitor/ExhibitorDashboard";
import BoothManagement from "../../Pages/Exhibitor/BoothManagement";
import ExhibitorProfile from "../../Pages/Exhibitor/ExhibitorProfile";
import ExhibitorAnalytics from "../../Pages/Exhibitor/ExhibitorAnalytics";
import ExhibitorMessages from "../../Pages/Exhibitor/ExhibitorMessages";

import AttendeeDashboard from "../../Pages/Attendee/AttendeeDashboard";
import EventSchedule from "../../Pages/Attendee/EventSchedule";
import AttendeeProfile from "../../Pages/Attendee/AttendeeProfile";
import AttendeeNotifications from "../../Pages/Attendee/AttendeeNotifications";

const UserLayout = () => {
  const role = localStorage.getItem("role");

  // Redirect to login if no role is found
  if (!role) return <Navigate to="/login" replace />;

  return (
    <div className="user-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <main>
          <Routes>
            {/* Exhibitor Routes */}
            {role === "exhibitor" && (
              <>
                <Route path="dashboard" element={<ExhibitorDashboard />} />
                <Route path="booth-management" element={<BoothManagement />} />
                <Route path="profile" element={<ExhibitorProfile />} />
                <Route path="analytics" element={<ExhibitorAnalytics />} />
                <Route path="messages" element={<ExhibitorMessages />} />
              </>
            )}

            {/* Attendee Routes */}
            {role === "attendee" && (
              <>
                <Route path="dashboard" element={<AttendeeDashboard />} />
                <Route path="event-schedule" element={<EventSchedule />} />
                <Route path="profile" element={<AttendeeProfile />} />
                <Route path="notifications" element={<AttendeeNotifications />} />
              </>
            )}

            {/* Default Route */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;

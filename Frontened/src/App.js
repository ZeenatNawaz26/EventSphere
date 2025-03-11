import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AddCircle, Edit } from '@mui/icons-material';

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// // // import Login from "./Pages/Login";
// // // import Registeration from "./Pages/Register";
// // // import Sidebar from "./Components/sidebar/sidebar";
// // // import Sidebar2 from "./Components/sidebar/Sidebar2";
// // // import Navbar from "./Components/navbar/navbar";

// // // import Header from './Components/navbar/Header';
// // // import Footer from './Components/navbar/Footer';
// // // import About from "./Pages/About"
// // // import Home from "./Pages/Home"
// // // import BuyTicket from "./Pages/BuyTicket"
// // // import Contact from "./Pages/Contact"
// // // import Schedule from "./Pages/Schedule"
// // // import Speaker from "./Pages/Speaker"
// // // import Sponsor from "./Pages/Sponsor"
// // // import Dashboard from "./Pages/Dashboard";
// // //  import User_Dashboard1 from "./Pages/user_panel/User_Dashboard1";
// // // import ExpoManagement from "./Pages/ExpoManagement";
// // // import BoothAllocation from "./Pages/BoothAllocation";
// // // import ExhibitorManagement from "./Pages/ExhibitorManagement";
// // // import ExpoForm from "./Pages/ExpoForm";
// // // import AttendeeManagement from "./Pages/AttendeeManagement";
// // // import ScheduleManagement from "./Pages/ScheduleManagement";
// // // import UserManagement from "./Pages/UserManagement";
// // // import Notifications from "./Pages/Notifications";
// // // import Messages from "./Pages/Messages";
// // // //  HEAD
// // // import ExpoRegistration from "./Pages/user_panel/ExpoRegistration";


// // // import ProtectedRoute from "./Components/ProtectedRoute";
// // // import Settings from "./Pages/Settings";
// // // import AnalyticsReporting from "./Pages/AnalyticsReporting"
// // // // >>>>>>> dc7f57d (session or notification work)
// // // function App() {
// // //   const userId = localStorage.getItem("userId");
// // //   const role = localStorage.getItem("role") || "guest"; // Ensure it’s getting stored & retrieved correctly

// // //   // ✅ Debugging localStorage values
// // //   console.log("🔍 User ID from localStorage:", userId);
// // //   console.log("🔍 Current Role from LocalStorage:", role);

// // //   // ✅ Set default role if null or undefined
// // //   if (role === null) {
// // //     role = "guest"; // Default role
// // //     localStorage.setItem("role", role);
// // //     console.log("⚙️ Role was null, set to:", role);
// // //   }

// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         {/* ✅ Public Routes */}
// // //         <Route
// // //           path="/"
// // //           element={
// // //             userId ? (
// // //               (console.log("✅ Redirecting to Dashboard"), <Navigate to="/dashboard" />)
// // //             ) : (
// // //               <HomeWithLayout />
// // //             )
// // //           }
// // //         />

// // //         <Route
// // //           path="/login"
// // //           element={
// // //             userId ? (
// // //               (console.log("✅ Redirecting to Dashboard"), <Navigate to="/dashboard" />)
// // //             ) : (
// // //               <Login />
// // //             )
// // //           }
// // //         />

// // //         <Route
// // //           path="/signup"
// // //           element={
// // //             userId ? (
// // //               (console.log("✅ Redirecting to Dashboard"), <Navigate to="/dashboard" />)
// // //             ) : (
// // //               <Registeration />
// // //             )
// // //           }
// // //         />

// // //         {/* ✅ Protected Routes */}
// // //         <Route
// // //           path="/*"
// // //           element={
// // //             <ProtectedRoute>
// // //               <MainLayout role={role} />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // // ✅ Home Page Layout with Header and Footer
// // // const HomeWithLayout = () => {
// // //   return (
// // //     <div className="app-container">
// // //       <Header /> {/* Include Header */}
// // //       <Home />   {/* Home Page Content */}
// // //       <Footer /> {/* Include Footer */}
// // //     </div>
// // //   );
// // // };

// // // // ✅ Main Layout with Sidebar & Navbar
// // // const MainLayout = ({ role }) => {
// // //   console.log("🛠️ Rendering MainLayout with Role:", role);

// // //   return (
// // //     <div className="app-container">
// // //       <Sidebar />
// // //       <Sidebar2 />
// // //       <div className="content">
// // //         <Navbar />
// // //         <Header />
// // //         <Footer />
// // //         <main>
// // //           <Routes>
// // //             <Route path='/about' element={<About />} />
// // //             <Route path='/speaker' element={<Speaker />} />
// // //             <Route path='/schedule' element={<Schedule />} />
// // //             <Route path='/sponsors' element={<Sponsor />} />
// // //             <Route path='/contact' element={<Contact />} />
// // //             <Route path='/buy-ticket' element={<BuyTicket />} />

// // //             <Route path="/dashboard" element={<Dashboard />} />
// // //             <Route path="/User_Dashboard1" element={<User_Dashboard1/>} />
// // //             <Route path="/event-management" element={<ExpoManagement />} />
// // //             <Route path="/expo/create" element={<ExpoForm />} />
// // //             <Route path="/expo/edit/:id" element={<ExpoForm />} />
// // //             <Route path="/booth-allocation" element={<BoothAllocation />} />
// // //             <Route path="/exhibitor-management" element={<ExhibitorManagement />} />
// // //             <Route path="/attendee-management" element={<AttendeeManagement />} />
// // //             <Route path="/schedule-management" element={<ScheduleManagement />} />

// // //             <Route path="/analytics-reporting/:expoId" element={<AnalyticsReporting />} />
// // //             <Route path="/messages/:expoId" element={<Messages />} />

           
// // //             <Route path="/settings" element={< Settings/>} />
// // //             <Route path="/analytics-reporting" element={<AnalyticsReporting />} />


// // //             <Route path="/messages" element={<Messages />} />
// // // <Route path="/notifications" element={<Notifications />} />
// // //  {/* (session or notification work) */}

// // //             <Route path="/exporegistration" element={<ExpoRegistration />} />

// // //             {/* ✅ Role-Based Access Debugging */}
// // //             {role === "admin" ? (
// // //               <>
// // //                 {console.log("✅ Role is Admin: Accessing User Management")}
// // //                 <Route path="/user-management" element={<UserManagement />} />
// // //               </>
// // //             ) : (
// // //               <>
// // //                 {console.log("❌ Role is NOT Admin: Redirecting to Dashboard")}
// // //                 <Route path="/user-management" element={<Navigate to="/dashboard" />} />
// // //               </>
// // //             )}

// // //             {/* ✅ Default route handling */}
// // //             <Route path="*" element={<Navigate to="/dashboard" replace />} />
// // //           </Routes>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default App;
// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import ProtectedRoute from "./Components/ProtectedRoute";

// // import AdminLayout from "./Components/Layouts/AdminLayout";
// // import UserLayout from "./Components/Layouts/UserLayout";
// // // import Header from "./navbar/Header";
// // // import Footer from "./navbar/Footer";
// // import Home from "./Pages/Home";
// // import Login from "./Pages/Login";
// // import Registeration from "./Pages/Register";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* ✅ Public Routes */}
// //         <Route path="/" element={<Home />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/signup" element={<Registeration />} />

// //         {/* ✅ Admin Protected Routes */}
// //         <Route
// //           path="/admin/*"
// //           element={
// //             <ProtectedRoute allowedRoles={["admin"]}>
// //               <AdminLayout />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* ✅ User Protected Routes */}
// //         <Route
// //           path="/user/*"
// //           element={
// //             <ProtectedRoute allowedRoles={["user"]}>
// //               <UserLayout />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* ✅ Default Redirect */}
// //         <Route path="*" element={<Navigate to="/" />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "./Components/ProtectedRoute";

// // ✅ Corrected imports
// import AdminLayout from "./Components/Layouts/AdminLayout";
// import UserLayout from "./Components/Layouts/UserLayout";
// import Header from "./Components/navbar/Header";  // ✅ Correct Path
// import Footer from "./Components/navbar/Footer";  // ✅ Correct Path
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Registeration from "./Pages/Register";

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Header /> {/* ✅ Navbar upar include karna hai */}
//         <Routes>
//           {/* ✅ Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Registeration />} />

//           {/* ✅ Admin Protected Routes */}
//           <Route
//             path="/admin/*"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           />

//           {/* ✅ User Protected Routes */}
//           <Route
//             path="/user/*"
//             element={
//               <ProtectedRoute allowedRoles={["user"]}>
//                 <UserLayout />
//               </ProtectedRoute>
//             }
//           />

//           {/* ✅ Default Redirect */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//         <Footer /> {/* ✅ Footer neeche include karna hai */}
//       </div>
//     </Router>
//   );
// }

// // export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import PublicLayout from "./Components/Layouts/PublicLayout";
// import UserLayout from "./Components/Layouts/UserLayout";
// import Login from "./Pages/Login";
// import Registeration from "./Pages/Register";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ✅ Public Routes */}
//         <Route path="/*" element={<PublicLayout />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Registeration />} />

//         {/* ✅ User Protected Routes */}
//         <Route
//           path="/user/*"
//           element={
//             <ProtectedRoute allowedRoles={["user"]}>
//               <UserLayout />
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ Default Redirect */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppRoutes from "./Routes";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserLayout from "./Components/Layouts/UserLayout";
import AdminLayout from "./Components/Layouts/AdminLayout";
import Login from "./Pages/Login";
import Registeration from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";  // ✅ Add this
import ResetPassword from "./Pages/ResetPassword";  // ✅ Add this
import "./Pages/login.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/*" element={<AppRoutes />} />

        {/* ✅ Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registeration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ✅ Protected Admin Route */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* ✅ Protected User Route */}
        <Route
          path="/exhibitor/*"
          element={
            <ProtectedRoute allowedRoles={["exhibitor"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        />

        {/* ✅ Default Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

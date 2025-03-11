// // import React from "react";
// // import { Navigate } from "react-router-dom";

// // const ProtectedRoute = ({ children }) => {
// //   const userId = localStorage.getItem("userId");

// //   return userId ? children : <Navigate to="/login" />;
// // };

// // export default ProtectedRoute;
// import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const role = localStorage.getItem("role");

//     setIsAuthenticated(!!userId); // true if userId exists
//     setUserRole(role);
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Or show a spinner
//   }

//   // 🔹 If not authenticated, redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   // 🔹 If role is not allowed, redirect to dashboard
//   if (!allowedRoles.includes(userRole)) {
//     return <Navigate to="/dashboard" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    setIsAuthenticated(!!userId); // Check if userId exists
    setUserRole(role);
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Wait for state update

  // Redirect if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Redirect if user role is not allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

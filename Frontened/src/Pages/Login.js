// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import axios from "axios";
// import { FaUser, FaLock} from "react-icons/fa";
// import "./style.css";

// const Login = () => {
//   const [useremail, setUseremail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     document.body.classList.add("auth-page");
//     return () => {
//       document.body.classList.remove("auth-page");
//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/api/users/login", {
//         email: useremail,
//         password: password,
//       });

//       if (response.data.userId) {
//         localStorage.setItem("userId", response.data.userId);
//         localStorage.setItem("userName", response.data.name);
//         localStorage.setItem("role", response.data.role); 

//         navigate("/dashboard"); 
//       } else {
//         alert("Login failed. Please try again.");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1>Login</h1>
//         <form onSubmit={handleLogin}>
//           <div className="input-container">
//             <FaUser />
//             <input
//               type="email"
//               placeholder="Type your email"
//               value={useremail}
//               onChange={(e) => setUseremail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <FaLock />
//             <input
//               type="password"
//               placeholder="Type your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         {/* <div className="social-login">
//           <p>Or Sign Up Using</p>
//           <div className="social-icons">
//             <FaFacebookF />
//             <FaTwitter />
//             <FaGoogle />
//           </div>
//         </div> */}
//         <p className="signup-link">
//           Don't have an account yet?<a href="/signup">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUser, FaLock } from "react-icons/fa";
// import "./style.css";

// const Login = () => {
//   const [useremail, setUseremail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.body.classList.add("auth-page");
//     return () => {
//       document.body.classList.remove("auth-page");
//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/api/users/login", {
//         email: useremail,
//         password: password,
//       });

//       if (response.data.userId) {
//         localStorage.setItem("userId", response.data.userId);
//         localStorage.setItem("userName", response.data.name);
//         localStorage.setItem("role", response.data.role);

//         setUseremail(""); // Reset field after login
//         setPassword(""); // Reset field after login

//         navigate("/dashboard");
//       } else {
//         alert("Login failed. Please try again.");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1>Login</h1>
//         <form onSubmit={handleLogin} autoComplete="off">
//           {/* Hidden dummy field to trick auto-fill */}
//           <input type="text" name="fakeuser" style={{ display: "none" }} />

//           <div className="input-container">
//             <FaUser />
//             <input
//               type="email"
//               placeholder="Type your email"
//               value={useremail}
//               onChange={(e) => setUseremail(e.target.value)}
//               required
//               autoComplete="new-email"
//               name="email"
//             />
//           </div>
//           <div className="input-container">
//             <FaLock />
//             <input
//               type="password"
//               placeholder="Type your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               autoComplete="new-password"
//               name="password"
//             />
//           </div>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <p className="signup-link">
//           Don't have an account yet? <a href="/signup">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUser, FaLock } from "react-icons/fa";
// import "./login.css";

// const Login = () => {
//   const [useremail, setUseremail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setUseremail(""); // Clear email on load
//     setPassword(""); // Clear password on load
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:8000/api/users/login", {
//         email: useremail,
//         password: password,
//       });

//       if (response.data.userId) {
//         setUseremail(""); // Reset email after login
//         setPassword(""); // Reset password after login

//         localStorage.setItem("userId", response.data.userId);
//         localStorage.setItem("userName", response.data.name);
//         localStorage.setItem("role", response.data.role);

//         console.log("User Logged In:", response.data);

//         switch (response.data.role) {
//           case "admin":
//             navigate("/admin/dashboard");
//             break;
//           case "exhibitor":
//             navigate("/exhibitor/dashboard");
//             break;
//           case "attendee":
//             navigate("/attendee/dashboard");
//             break;
//           default:
//             navigate("/");
//         }
//       } else {
//         alert("Login failed. Please try again.");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1>Login</h1>
//         <form onSubmit={handleLogin} autoComplete="off">
//           <input type="text" name="hidden-field" autoComplete="off" style={{ display: "none" }} />
//           <div className="input-container">
//             <FaUser />
//             <input
//               type="email"
//               placeholder="Type your email"
//               value={useremail}
//               onChange={(e) => setUseremail(e.target.value)}
//               required
//               autoComplete="off"
//             />
//           </div>
//           <div className="input-container">
//             <FaLock />
//             <input
//               type="password"
//               placeholder="Type your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               autoComplete="new-password"
//             />
//           </div>
//           <button type="submit" className="login-button" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//           {/* Forgot Password Link */}
//           <p className="forgot-password">
//           <a href="/forgot-password">Forgot Password?</a>
//         </p>
//         <p className="signup-link">
//           Don't have an account yet? <a href="/signup">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import "./style.css";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => {
      document.body.classList.remove("auth-page");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("🟡 Attempting Login with:", { email: useremail, password });

    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        email: useremail,
        password: password,
      });

      console.log("✅ API Response:", response.data); // API Response Debugging

      if (response.data && response.data.userId) {
        setUseremail("");
        setPassword("");

        // ✅ Store user details in LocalStorage
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token); // ✅ Token store

        console.log("✅ Stored in LocalStorage:", {
          userId: localStorage.getItem("userId"),
          userName: localStorage.getItem("userName"),
          role: localStorage.getItem("role"),
          token: localStorage.getItem("token"),
        });

        // ✅ Navigate based on user role
        switch (response.data.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "exhibitor":
            navigate("/exhibitor/dashboard");
            break;
          case "attendee":
            navigate("/attendee/dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        console.warn("⚠️ Login failed. Invalid credentials.");
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin} autoComplete="off">
          <input type="text" name="hidden-field" autoComplete="off" style={{ display: "none" }} />
          <div className="input-container">
            <FaUser />
            <input
              type="email"
              placeholder="Type your email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <FaLock />
            <input
              type="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p className="signup-link">
          Don't have an account yet? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

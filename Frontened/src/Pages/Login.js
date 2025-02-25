import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import "./style.css";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        email: useremail,
        password: password,
      });
  
      console.log("Login Response:", response.data);
  
      if (response.data.userId) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("role", response.data.role); // ✅ Save role in localStorage
  
        console.log("✅ Role saved in localStorage:", response.data.role);
  
        navigate("/dashboard"); // ✅ Redirect to dashboard
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <FaUser />
            <input
              type="email"
              placeholder="Type your email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
              required
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
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="social-login">
          <p>Or Sign Up Using</p>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaGoogle />
          </div>
        </div>
        <p className="signup-link">
          Or Sign Up Using <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

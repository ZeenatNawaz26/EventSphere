import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import "./style.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "ATTENDEE",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const requestData = {
        Name: formData.username,  // ✅ Map username to Name
        Email: formData.email,
        Password: formData.password,
      };
  
      console.log("Sending Request:", requestData); // ✅ Debugging
      const response = await axios.post("http://localhost:8000/api/users/register", requestData);
  
      if (response.data) {
        setSuccess("Signup Successful! Redirecting...");
        setFormData({
          username: "",
          email: "",
          password: "",
          contactNumber: "",
          role: "ATTENDEE",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error.response?.data); // ✅ Print error
      setError(error.response?.data?.message || "Registration failed");
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <FaUser />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <FaPhone />
            <input
              type="text"
              name="contactNumber"
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <FaUser />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="ATTENDEE">Attendee</option>
              <option value="EXHIBITOR">Exhibitor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-button">
            Sign Up
          </button>
        </form>

        <p className="signup-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

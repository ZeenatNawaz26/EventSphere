import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import "./style.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "", // ✅ Changed from username to name
    email: "",
    password: "",
    contactNumber: "",
    role: "attendee", // ✅ Keep lowercase to match backend
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("Sending Request:", formData); // ✅ Debugging log

      const response = await axios.post("http://localhost:8000/api/users/register", formData);

      if (response.data) {
        setSuccess("Signup Successful! Redirecting...");
        setFormData({
          name: "",
          email: "",
          password: "",
          contactNumber: "",
          role: "attendee",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error.response?.data); // ✅ Debugging error log
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
          {/* Name Field */}
          <div className="input-container">
            <FaUser />
            <input
              type="text"
              name="name" // ✅ Changed from username to name
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Contact Number Field */}
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

          {/* Role Selection */}
          <div className="input-container">
            <FaUser />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="attendee">Attendee</option>
              <option value="exhibitor">Exhibitor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
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

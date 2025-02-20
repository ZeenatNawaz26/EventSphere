import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import "./style.css"; // Yahan updated CSS ko import karein

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "ATTENDEE",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Signup Successful!");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Sign Up</h1>
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

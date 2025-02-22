import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import './style.css';

const Login = () => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        Email: useremail, // ✅ Change email to useremail
        Password: password,
      });

      // Assuming the response includes the token and the username
      if (response.data) {
        localStorage.setItem('email', useremail);  // ✅ Use useremail instead of email
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.log(error);
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
              value={useremail}  // ✅ Use useremail instead of email
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
          <button type="submit" className="login-button">Login</button>
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

import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa'; // Import required icons
import './style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        Email:username,
        Password:password,
      });

      // Assuming the response includes the token and the username
      if (response.data) {
        localStorage.setItem('username', username);  // Store the username in localStorage
        localStorage.setItem('token', response.data.token);  // Store the token in localStorage
        alert('Login successful!');
        window.location.href = '/dashboard'; // Redirect to Dashboard
      }
    } catch (error) {
        console.log(error)
      alert(error);
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
              type="text"
              placeholder="Type your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

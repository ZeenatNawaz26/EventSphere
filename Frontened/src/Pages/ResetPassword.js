// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ResetPassword = () => {
//   const { token } = useParams(); // Get the token from the URL
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:8000/api/users-pass/reset-password", {
//         token,
//         password,
//       });

//       setMessage(response.data.message);
//       setTimeout(() => {
//         navigate("/login"); // Redirect to login page after success
//       }, 3000);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="reset-password-container">
//       <h2>Set a New Password</h2>
//       <form onSubmit={handleResetPassword}>
//         <input 
//           type="password" 
//           placeholder="Enter new password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           required
//         />
//         <input 
//           type="password" 
//           placeholder="Confirm new password" 
//           value={confirmPassword} 
//           onChange={(e) => setConfirmPassword(e.target.value)} 
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users-pass/reset-password",
        {
          token,
          password,
        }
      );

      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after success
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }} textAlign="center">
          Reset Your Password
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }} textAlign="center">
          Enter your new password below to reset your account password.
        </Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ width: "100%" }}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:8000/api/expos"; // ✅ Backend API

const ExpoForm = () => {
  const { id } = useParams(); // ✅ Get Expo ID from URL (for edit mode)
  const navigate = useNavigate();

  const [expo, setExpo] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  // ✅ Fetch Expo Details (for Edit)
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/${id}`)
        .then((response) => {
          setExpo(response.data);
        })
        .catch((error) => console.error("❌ Error fetching expo:", error));
    }
  }, [id]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setExpo({ ...expo, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submit (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, expo); // Update Expo
      } else {
        await axios.post(`${API_URL}/create`, expo); // Create Expo
      }
      navigate("/"); // ✅ Redirect to Dashboard after saving
    } catch (error) {
      console.error("❌ Error saving expo:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        {id ? "Edit Expo" : "Add New Expo"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={expo.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={expo.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          required
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={expo.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Location"
          name="location"
          value={expo.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? "Update Expo" : "Create Expo"}
        </Button>
      </form>
    </Container>
  );
};

export default ExpoForm;

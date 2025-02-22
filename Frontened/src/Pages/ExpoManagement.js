import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";

const API_URL = "http://localhost:8000/api/expos"; // ✅ Backend API

const ExpoManagement = () => {
  const [expos, setExpos] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentExpo, setCurrentExpo] = useState({
    id: null,
    title: "",
    description: "",
    date: "",
    location: "",
  });

  // ✅ Fetch All Expos
  const fetchExpos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setExpos(response.data);
    } catch (error) {
      setError("❌ Error fetching expos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpos();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setCurrentExpo({ ...currentExpo, [e.target.name]: e.target.value });
  };

  // ✅ Open Modal (for Create & Update)
  const handleOpen = (expo = { id: null, title: "", description: "", date: "", location: "" }) => {
    setCurrentExpo(expo);
    setOpen(true);
  };

  // ✅ Close Modal
  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  // ✅ Validate Input Fields
  const validateForm = () => {
    if (!currentExpo.title || !currentExpo.description || !currentExpo.date || !currentExpo.location) {
      setError("❌ All fields are required!");
      return false;
    }
    return true;
  };

  // ✅ Create or Update Expo
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (currentExpo.id) {
        await axios.put(`${API_URL}/${currentExpo.id}`, currentExpo);
        setSuccessMessage("✅ Expo updated successfully!");
      } else {
        await axios.post(`${API_URL}/create`, currentExpo);
        setSuccessMessage("✅ Expo created successfully!");
      }
      fetchExpos();
      handleClose();
    } catch (error) {
      setError("❌ Error saving expo. Please try again.");
    }
  };

  // ✅ Delete Expo
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expo?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setSuccessMessage("✅ Expo deleted successfully!");
        fetchExpos();
      } catch (error) {
        setError("❌ Error deleting expo. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Expo Management
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        + Add Expo
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expos.length > 0 ? (
              expos.map((expo) => (
                <TableRow key={expo._id}>
                  <TableCell>{expo.title}</TableCell>
                  <TableCell>{expo.description}</TableCell>
                  <TableCell>{new Date(expo.date).toLocaleDateString()}</TableCell>
                  <TableCell>{expo.location}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleOpen({ ...expo, id: expo._id })}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(expo._id)} sx={{ ml: 1 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No expos found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* ✅ Add/Edit Expo Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentExpo.id ? "Edit Expo" : "Add Expo"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField margin="dense" label="Title" name="title" value={currentExpo.title} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="Description" name="description" value={currentExpo.description} onChange={handleChange} fullWidth multiline rows={3} required />
          <TextField margin="dense" label="Date" type="date" name="date" value={currentExpo.date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
          <TextField margin="dense" label="Location" name="location" value={currentExpo.location} onChange={handleChange} fullWidth required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Success Message Snackbar */}
      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage("")}>
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ExpoManagement;

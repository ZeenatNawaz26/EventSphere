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
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { Alert, IconButton } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const API_URL = "http://localhost:8000/api/booths";
const EXHIBITOR_API = "http://localhost:8000/api/exhibitors";
const EXPO_API = "http://localhost:8000/api/expos";  

const BoothAllocation = () => {
  const [booths, setBooths] = useState([]);
  const [exhibitors, setExhibitors] = useState([]);
  const [expos, setExpos] = useState([]);  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentBooth, setCurrentBooth] = useState({
    id: null,
    number: "",
    location: "",
    exhibitor: null,
    status: "Available",  // Default Status
    expo: "",
  });

  const fetchBooths = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setBooths(response.data);
    } catch (error) {
      setError("Error fetching booths. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpos = async () => {
    try {
      const response = await axios.get(EXPO_API);
      console.log("📥 Expo Data Fetched:", response.data); // Debugging
      setExpos(response.data);
    } catch (error) {
      console.error("❌ Error fetching expos:", error);
    }
  };
  
  
  const fetchExhibitors = async () => {
    try {
      const response = await axios.get(EXHIBITOR_API);
      console.log("Exhibitor Data:", response.data); // ✅ Debugging ke liye
      setExhibitors(response.data);
    } catch (error) {
      console.error("Error fetching exhibitors:", error);
    }
  };
  

  useEffect(() => {
    fetchBooths();
    fetchExhibitors();
    fetchExpos();
  }, []);
  
  useEffect(() => {
    console.log("🔄 Updated Expo List:", expos);
  }, [expos]);
  

  const handleChange = (e) => {
    setCurrentBooth({ ...currentBooth, [e.target.name]: e.target.value });
  };

  const handleOpen = (booth = { id: null, number: "", location: "", exhibitor: null, status: "Available", expo: "" }) => {
    setCurrentBooth(booth);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const validateForm = () => {
    if (!currentBooth.number || !currentBooth.location || !currentBooth.expo) {
      setError("All fields are required!");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      if (currentBooth.id) {
        await axios.put(`${API_URL}/${currentBooth.id}`, currentBooth);
        setSuccessMessage("Booth updated successfully!");
      } else {
        await axios.post(`${API_URL}/create`, {
          ...currentBooth,
          exhibitor: currentBooth.exhibitor || null,
        });
        setSuccessMessage("Booth created successfully!");
      }
      fetchBooths();
      handleClose();
    } catch (error) {
      setError("Error saving booth. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booth?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setSuccessMessage("Booth deleted successfully!");
        fetchBooths();
      } catch (error) {
        setError("Error deleting booth. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Booth Allocation
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add Booth
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={3} sx={{ overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Booth Number</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Expo</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Exhibitor</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booths.length > 0 ? (
                booths.map((booth) => (
                  <TableRow key={booth._id} hover>
                    <TableCell>{booth.number}</TableCell>
                    <TableCell>{booth.location}</TableCell>
                    <TableCell>{booth.expo ? booth.expo.name : "N/A"}</TableCell>
                    <TableCell>{booth.status}</TableCell>
                    <TableCell>{booth.exhibitor ? booth.exhibitor.name : "Not Assigned"}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpen({ ...booth, id: booth._id })}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(booth._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No booths found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentBooth.id ? "Edit Booth" : "Add Booth"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField margin="dense" label="Booth Number" name="number" value={currentBooth.number} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="Location" name="location" value={currentBooth.location} onChange={handleChange} fullWidth required />
          
          <Select 
  fullWidth 
  name="expo" 
  value={currentBooth.expo || ""} 
  onChange={handleChange} 
  displayEmpty
>
  <MenuItem value="">
    <em>Select Expo</em>
  </MenuItem>
  {expos.map((expo) => (
    <MenuItem key={expo._id} value={expo._id}>
      {expo.title} {/* FIX: Use expo.title instead of expo */}
    </MenuItem>
  ))}
</Select>


{/* Exhibitor Dropdown */}
<Select 
  fullWidth 
  name="exhibitor" 
  value={currentBooth.exhibitor || ""} 
  onChange={handleChange} 
  displayEmpty
>
  <MenuItem value=""><em>{exhibitors.length > 0 ? "Select Exhibitor" : "No Exhibitor Available"}</em></MenuItem>
  {exhibitors.map((exhibitor) => (
    <MenuItem key={exhibitor._id} value={exhibitor._id}>{exhibitor.companyName || exhibitor.name}</MenuItem>
  ))}
</Select>

          {/* Status Dropdown */}
          <Select fullWidth name="status" value={currentBooth.status} onChange={handleChange}>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Occupied">Occupied</MenuItem>
            <MenuItem value="Reserved">Reserved</MenuItem>
          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BoothAllocation;

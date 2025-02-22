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
  Select,
  MenuItem,
} from "@mui/material";

const API_URL = "http://localhost:8000/api/booths"; // ✅ Backend URL

const BoothAllocation = () => {
  const [booths, setBooths] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentBooth, setCurrentBooth] = useState({
    id: null,
    number: "",
    location: "",
    expo: "",
  });

  // ✅ Fetch All Booths
  const fetchBooths = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooths(response.data);
    } catch (error) {
      console.error("❌ Error fetching booths:", error);
    }
  };

  useEffect(() => {
    fetchBooths();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setCurrentBooth({ ...currentBooth, [e.target.name]: e.target.value });
  };

  // ✅ Open Modal (for Create & Update)
  const handleOpen = (booth = { id: null, number: "", location: "", expo: "" }) => {
    setCurrentBooth(booth);
    setOpen(true);
  };

  // ✅ Close Modal
  const handleClose = () => setOpen(false);

  // ✅ Create or Update Booth
  const handleSave = async () => {
    try {
      if (currentBooth.id) {
        await axios.put(`${API_URL}/${currentBooth.id}`, currentBooth);
      } else {
        await axios.post(`${API_URL}/create`, currentBooth);
      }
      fetchBooths();
      handleClose();
    } catch (error) {
      console.error("❌ Error saving booth:", error);
    }
  };

  // ✅ Delete Booth
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booth?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchBooths();
      } catch (error) {
        console.error("❌ Error deleting booth:", error);
      }
    }
  };

  return (
    <Container>
      <h2>Booth Management</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Booth
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booth Number</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Exhibitor</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {booths.map((booth) => (
            <TableRow key={booth._id}>
              <TableCell>{booth.number}</TableCell>
              <TableCell>{booth.location}</TableCell>
              <TableCell>{booth.status}</TableCell>
              <TableCell>{booth.exhibitor ? booth.exhibitor.name : "Not Assigned"}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleOpen({ ...booth, id: booth._id })}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDelete(booth._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✅ Add/Edit Booth Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentBooth.id ? "Edit Booth" : "Add Booth"}</DialogTitle>
        <DialogContent>
          <TextField label="Booth Number" name="number" value={currentBooth.number} onChange={handleChange} fullWidth />
          <TextField label="Location" name="location" value={currentBooth.location} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BoothAllocation;

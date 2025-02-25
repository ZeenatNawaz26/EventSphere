import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button, Modal, Box, TextField, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]); // Store events
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: "",
    checkedIn: false
  });

  // Fetch attendees & events from backend
  useEffect(() => {
    fetchAttendees();
    fetchEvents(); // Fetch events for dropdown
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/attendees");
      setAttendees(response.data);
    } catch (error) {
      console.error("❌ Error fetching attendees:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("❌ Error fetching events:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/attendees/register", formData);
      fetchAttendees();
      setOpen(false);
      setFormData({ name: "", email: "", phone: "", eventId: "", checkedIn: false });
    } catch (error) {
      console.error("❌ Error adding attendee:", error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        Attendee Management
      </Typography>

      <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} onClick={() => setOpen(true)}>
        Add Attendee
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Add New Attendee</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required />
            
            {/* Event Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Event</InputLabel>
              <Select name="eventId" value={formData.eventId} onChange={handleChange} required>
                {events.map((event) => (
                  <MenuItem key={event._id} value={event._id}>{event.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>Submit</Button>
          </form>
        </Box>
      </Modal>

      {/* Attendee List */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Event</b></TableCell>
              <TableCell><b>Checked In</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendees.length > 0 ? (
              attendees.map((attendee) => (
                <TableRow key={attendee._id}>
                  <TableCell>{attendee.name}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>{attendee.phone}</TableCell>
                  <TableCell>{events.find(event => event._id === attendee.eventId)?.name || "Unknown Event"}</TableCell>
                  <TableCell>{attendee.checkedIn ? "✅ Yes" : "❌ No"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No attendees found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AttendeeManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import "../App.css";

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: "",
  });

  useEffect(() => {
    fetchAttendees();
    fetchEvents();
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
      setFormData({ name: "", email: "", phone: "", eventId: "" });
    } catch (error) {
      console.error("❌ Error adding attendee:", error.response?.data || error.message);
    }
  };

  const handleCheckIn = async (attendeeId) => {
    if (!window.confirm("Check in this attendee?")) return;

    try {
      await axios.put(`http://localhost:8000/api/attendees/${attendeeId}/checkin`, { checkedIn: true });
      fetchAttendees();
      alert("Attendee checked in successfully!");
    } catch (error) {
      console.error("❌ Error checking in:", error);
      alert("Failed to check in attendee.");
    }
  };

  const handleCheckOut = async (attendeeId) => {
    if (!window.confirm("Check out this attendee?")) return;

    try {
      await axios.put(`http://localhost:8000/api/attendees/${attendeeId}/checkin`, { checkedIn: false });
      fetchAttendees();
      alert("Attendee checked out successfully!");
    } catch (error) {
      console.error("❌ Error checking out:", error);
      alert("Failed to check out attendee.");
    }
  };

  return (
    <Container className="attendee-container">
      <Typography variant="h4"  sx={{ mt: 3 }}>
        Attendee Management
      </Typography>
<br/>
      <Button className="add-attendee-btn" onClick={() => setOpen(true)}>
        + Add Attendee
      </Button>

      {/* Modal for Adding Attendee */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="attendee-modal">
          <Typography variant="h6" gutterBottom>Add New Attendee</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required />

            <FormControl fullWidth margin="normal">
              <InputLabel>Select Event</InputLabel>
              <Select name="eventId" value={formData.eventId} onChange={handleChange} required>
                {events.length > 0 ? (
                  events.map((event) => (
                    <MenuItem key={event._id} value={event._id}>{event.name}</MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No events available</MenuItem>
                )}
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>Submit</Button>
          </form>
        </Box>
      </Modal>

      {/* Attendee List */}
      <TableContainer component={Paper} className="attendee-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Event</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendees.length > 0 ? (
              attendees.map((attendee) => (
                <TableRow key={attendee._id}>
                  <TableCell>{attendee.name}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>{attendee.phone}</TableCell>
                  <TableCell>{attendee.event?.name || "No Event"}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Check In">
                      <IconButton onClick={() => handleCheckIn(attendee._id)} className="checkin-btn">
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Check Out">
                      <IconButton onClick={() => handleCheckOut(attendee._id)} className="checkout-btn">
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ScheduleManagement = () => {
    const [schedules, setSchedules] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ expoId: "", eventName: "", startTime: "", endTime: "" });

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/schedules");
            setSchedules(response.data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/schedules/create", formData);
            fetchSchedules();
            setOpen(false);
        } catch (error) {
            console.error("Error adding schedule:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/schedules/${id}`);
            fetchSchedules();
        } catch (error) {
            console.error("Error deleting schedule:", error);
        }
    };

    return (
        <div>
            <h2>Schedule Management</h2>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Schedule</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedules.map((schedule) => (
                            <TableRow key={schedule._id}>
                                <TableCell>{schedule.eventName}</TableCell>
                                <TableCell>{new Date(schedule.startTime).toLocaleString()}</TableCell>
                                <TableCell>{new Date(schedule.endTime).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button color="secondary" onClick={() => handleDelete(schedule._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={{ padding: 20, backgroundColor: "white", margin: "100px auto", width: 400 }}>
                    <h2>Add Schedule</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Expo ID" name="expoId" fullWidth margin="normal" onChange={handleChange} required />
                        <TextField label="Event Name" name="eventName" fullWidth margin="normal" onChange={handleChange} required />
                        <TextField type="datetime-local" name="startTime" fullWidth margin="normal" onChange={handleChange} required />
                        <TextField type="datetime-local" name="endTime" fullWidth margin="normal" onChange={handleChange} required />
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ScheduleManagement;

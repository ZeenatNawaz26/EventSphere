import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, 
    MenuItem, Select, InputLabel, FormControl, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ExhibitorManagement = () => {
    const [exhibitors, setExhibitors] = useState([]);
    const [boothTypes, setBoothTypes] = useState(["Small", "Medium", "Large", "A1", "A2", "B1", "B2"]);
    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        selectedBoothType: "",
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchExhibitors();
    }, []);

    const fetchExhibitors = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/exhibitors/");
            setExhibitors(response.data);
        } catch (error) {
            console.error("❌ Error fetching exhibitors:", error.response?.data || error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { companyName, contactPerson, email, phone, selectedBoothType } = formData;

        if (!companyName || !contactPerson || !email || !phone || !selectedBoothType) {
            alert("Please fill in all fields");
            return;
        }

        const formDataToSend = {
            companyName,
            contactPerson,
            email,
            phone,
            expoId: "65d7e4f2c8a5e9b6f8a4d3e1",
            boothPreference: selectedBoothType
        };

        try {
            await axios.post("http://localhost:8000/api/exhibitors/register", formDataToSend);
            setOpen(false);
            fetchExhibitors();
        } catch (error) {
            console.error("❌ Error adding exhibitor:", error.response?.data || error.message);
        }
    };

    return (
        <Card sx={{ p: 3, m: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Exhibitor Management
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                    Add Exhibitor
                </Button>
                
                {/* Exhibitor Table */}
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell><b>Company Name</b></TableCell>
                                <TableCell><b>Contact Person</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                <TableCell><b>Phone</b></TableCell>
                                <TableCell><b>Booth Type</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exhibitors.map((exhibitor) => (
                                <TableRow key={exhibitor._id}>
                                    <TableCell>{exhibitor.companyName}</TableCell>
                                    <TableCell>{exhibitor.contactPerson}</TableCell>
                                    <TableCell>{exhibitor.email}</TableCell>
                                    <TableCell>{exhibitor.phone}</TableCell>
                                    <TableCell>{exhibitor.boothPreference}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

            {/* Add Exhibitor Modal */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Exhibitor</DialogTitle>
                <DialogContent>
                    <TextField label="Company Name" name="companyName" fullWidth margin="dense" value={formData.companyName} onChange={handleChange} />
                    <TextField label="Contact Person" name="contactPerson" fullWidth margin="dense" value={formData.contactPerson} onChange={handleChange} />
                    <TextField label="Email" name="email" type="email" fullWidth margin="dense" value={formData.email} onChange={handleChange} />
                    <TextField label="Phone" name="phone" fullWidth margin="dense" value={formData.phone} onChange={handleChange} />
                    
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Booth Type</InputLabel>
                        <Select name="selectedBoothType" value={formData.selectedBoothType} onChange={handleChange}>
                            {boothTypes.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default ExhibitorManagement;

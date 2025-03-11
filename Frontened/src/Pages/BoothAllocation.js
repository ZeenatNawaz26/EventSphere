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
  import "../App.css";
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
      exhibitor: "",
      status: "Available",
      expo: "",
    });

    const fetchBooths = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/all`);
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
        setExpos(response.data);
      } catch (error) {
        console.error("Error fetching expos:", error);
      }
    };

    const fetchExhibitors = async () => {
      try {
        const response = await axios.get(EXHIBITOR_API);
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

    // const handleSave = async () => {
    //   if (!currentBooth.number || !currentBooth.location || !currentBooth.expo) {
    //     setError("All fields are required!");
    //     return;
    //   }

    //   try {
    //     const boothData = {
    //       ...currentBooth,
    //       expo: currentBooth.expo, // Already storing only _id
    //       exhibitor: currentBooth.exhibitor || null, // Store _id or null
    //     };

    //     if (currentBooth.id) {
    //       await axios.put(`${API_URL}/update/${currentBooth.id}`, boothData);
    //       setSuccessMessage("Booth updated successfully!");
    //     } else {
    //       await axios.post(`${API_URL}/create`, boothData);
    //       setSuccessMessage("Booth created successfully!");
    //     }
    //     fetchBooths();
    //     setOpen(false);
    //   } catch (error) {
    //     setError("Error saving booth. Please try again.");
    //   }
    // };

    // const handleDelete = async (id) => {
    //   if (window.confirm("Are you sure you want to delete this booth?")) {
    //     try {
    //       await axios.delete(`${API_URL}/delete/${id}`);
    //       setSuccessMessage("Booth deleted successfully!");
    //       fetchBooths();
    //     } catch (error) {
    //       setError("Error deleting booth. Please try again.");
    //     }
    //   }
    // };
    const handleSave = async () => {
      if (!currentBooth.number || !currentBooth.location || !currentBooth.expo) {
        setError("All fields are required!");
        return;
      }
    
      try {
        const boothData = {
          ...currentBooth,
          expo: currentBooth.expo, // Ensure it's just the _id
          exhibitor: currentBooth.exhibitor || null, // Ensure it's just the _id or null
        };
    
        if (currentBooth.id) {
          // ✅ Validate Booth ID before updating
          if (!currentBooth.id || currentBooth.id.length !== 24) {
            console.error("❌ Invalid Booth ID:", currentBooth.id);
            setError("Invalid Booth ID. Cannot update.");
            return;
          }
    
          await axios.put(`${API_URL}/update/${currentBooth.id}`, boothData);
          setSuccessMessage("Booth updated successfully!");
        } else {
          await axios.post(`${API_URL}/create`, boothData);
          setSuccessMessage("Booth created successfully!");
        }
    
        fetchBooths();
        setOpen(false);
      } catch (error) {
        console.error("❌ Error saving booth:", error);
        setError("Error saving booth. Please try again.");
      }
    };
    const handleDelete = async (id) => {
      if (!id || id.length !== 24) {  // ✅ Ensure ID is valid before deleting
        console.error("❌ Invalid Booth ID:", id);
        setError("Invalid Booth ID. Cannot delete.");
        return;
      }
    
      if (window.confirm("Are you sure you want to delete this booth?")) {
        try {
          await axios.delete(`${API_URL}/delete/${id}`);
          setSuccessMessage("Booth deleted successfully!");
          fetchBooths();
        } catch (error) {
          console.error("❌ Error deleting booth:", error);
          setError("Error deleting booth. Please try again.");
        }
      }
    };
        

    return (
      <Container className="container">
        <Typography variant="h4" gutterBottom>
          Booth Allocation
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => {
            setCurrentBooth({
              id: null,
              number: "",
              location: "",
              exhibitor: "",
              status: "Available",
              expo: "",
            });
            setOpen(true);
          }}
          sx={{ mb: 2 }}
        >
          Add Booth
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper elevation={3} sx={{ overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Booth Number</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Location</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Expo</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Exhibitor</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booths.length > 0 ? (
                  booths.map((booth) => (
                    <TableRow key={booth._id} hover>
                      <TableCell>{booth.number}</TableCell>
                      <TableCell>{booth.location}</TableCell>
                      <TableCell>
                        {booth.expo ? booth.expo.title : "N/A"}
                      </TableCell>
                      <TableCell>{booth.status}</TableCell>
                      <TableCell>
                        {booth.exhibitor
                          ? booth.exhibitor.companyName || "Not Assigned"
                          : "Not Assigned"}
                      </TableCell>
                      <TableCell>
                        {/* <IconButton
                          color="primary"
                          onClick={() => {
                            setCurrentBooth(booth);
                            setOpen(true);
                          }}
                        >
                          <Edit />
                        </IconButton> */}
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setCurrentBooth({
                              id: booth._id,
                              number: booth.number,
                              location: booth.location,
                              status: booth.status,
                              expo: booth.expo ? booth.expo._id : "", // Ensure only _id is stored
                              exhibitor: booth.exhibitor
                                ? booth.exhibitor._id
                                : "", // Ensure only _id is stored
                            });
                            setOpen(true);
                          }}
                        >
                          <Edit />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleDelete(booth._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No booths found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        )}

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>
            {currentBooth.id ? "Edit Booth" : "Add Booth"}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Booth Number"
              value={currentBooth.number}
              onChange={(e) =>
                setCurrentBooth({ ...currentBooth, number: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="dense"
              label="Location"
              value={currentBooth.location}
              onChange={(e) =>
                setCurrentBooth({ ...currentBooth, location: e.target.value })
              }
            />
            <Select
              fullWidth
              value={currentBooth.status}
              onChange={(e) =>
                setCurrentBooth({ ...currentBooth, status: e.target.value })
              }
              sx={{ mt: 2 }}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Occupied">Occupied</MenuItem>
              <MenuItem value="Reserved">Reserved</MenuItem>
            </Select>
            {/* <Select
              fullWidth
              name="expo"
              value={currentBooth.expo || ""} // Ensure it holds only _id
              onChange={(e) =>
                setCurrentBooth({ ...currentBooth, expo: e.target.value })
              }
              sx={{ mt: 2 }}
            >
              <MenuItem value="">
                <em>Select Expo</em>
              </MenuItem>
              {expos.map((expo) => (
                <MenuItem key={expo._id} value={expo._id}>
                  {expo.title}
                </MenuItem>
              ))}
            </Select> */}

            <Select
              fullWidth
              name="expo"
              value={currentBooth.expo || ""} // Ensure it holds only _id
              onChange={(e) =>
                setCurrentBooth({ ...currentBooth, expo: e.target.value })
              }
              displayEmpty
              sx={{ mt: 2 }}
            >
              <MenuItem value="">
                <em>Select Expo</em>
              </MenuItem>
              {expos.map((expo) => (
                <MenuItem key={expo._id} value={expo._id}>
                  {expo.title}
                </MenuItem>
              ))}
            </Select>

       

            <Select
              fullWidth
              name="exhibitor"
              value={currentBooth.exhibitor || ""} // Ensure it holds only _id
              onChange={(e) =>
                setCurrentBooth({ ...currentBooth, exhibitor: e.target.value })
              }
              displayEmpty
              sx={{ mt: 2 }}
            >
              <MenuItem value="">
                <em>Select Exhibitor</em>
              </MenuItem>
              {exhibitors.map((exhibitor) => (
                <MenuItem key={exhibitor._id} value={exhibitor._id}>
                  {exhibitor.companyName}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={!!error || !!successMessage} autoHideDuration={3000} onClose={() => { setError(""); setSuccessMessage(""); }}>
          <Alert severity={error ? "error" : "success"}>{error || successMessage}</Alert>
        </Snackbar>
      </Container>
    );
  };

  export default BoothAllocation;

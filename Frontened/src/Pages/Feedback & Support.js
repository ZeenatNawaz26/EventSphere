import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from "@mui/material";
import "../App.css";
const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/feedback/all");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        User Feedback
      </Typography>
      <Card elevation={3} sx={{ borderRadius: 2, p: 2 }}>
        <CardContent>
          <List>
            {feedbacks.length > 0 ? (
              feedbacks.map((fb, index) => (
                <div key={fb._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {fb.userId?.name || "Unknown User"}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            {fb.userId?.email || "No Email"}
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            {fb.message}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index !== feedbacks.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <Typography variant="body1" align="center">
                No feedback available.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminFeedback;

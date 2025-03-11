import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import { List, ListItem, ListItemText, Button } from "@mui/material";
import ReplyModal from "./ReplyModal";

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.warn("⚠️ userId is missing in localStorage");
      return;
    }

    let isMounted = true; // Prevent state updates if component unmounts

    // const fetchNotifications = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8000/api/messages/notifications/${userId}`); // ✅ Fixed template literal
    //     console.log("✅ Notifications fetched:", response.data);
    //     setNotifications(response.data); // ✅ Store notifications properly
    //   } catch (error) {
    //     console.error("❌ Error fetching notifications:", error.response?.data || error.message);
    //   }
    // };


    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/messages/notifications/${userId}`);
        console.log("✅ Notifications fetched:", response.data);
      } catch (error) {
        console.error("❌ Error fetching notifications:", error.response && error.response.data ? error.response.data : error.message);
      }
    };
    
    fetchNotifications();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, [userId]);

  const handleReply = (message) => {
    setSelectedMessage(message);
    setOpenModal(true);
  };

  return (
    <>
      <List>
        {notifications.length > 0 ? (
          notifications.map((msg) => (
            <ListItem key={msg._id}>
              <ListItemText primary={msg.message} secondary={`From: ${msg.senderId?.name || "Unknown"}`} />
              <Button variant="contained" onClick={() => handleReply(msg)}>
                Respond
              </Button>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No new notifications" />
          </ListItem>
        )}
      </List>
      <ReplyModal open={openModal} handleClose={() => setOpenModal(false)} message={selectedMessage} />
    </>
  );
};

export default NotificationList;

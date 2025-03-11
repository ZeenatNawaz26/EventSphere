import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { sendMessage, getUsers } from "../Components/messageService";
import "../App.css"; // ✅ Import CSS

const MessageForm = () => {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const userList = await getUsers();
      setUsers(userList);
    }
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(receiverId, message);
    alert("Message sent!");
    setMessage("");
  };

  return (
    <div className="message-form-container"> {/* ✅ Wrapped the form */}
      <form onSubmit={handleSubmit} className="message-form">
        <FormControl fullWidth>
          <InputLabel>Select User</InputLabel>
          <Select value={receiverId} onChange={(e) => setReceiverId(e.target.value)}>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name} ({user._id})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Message"
          multiline
          rows={3}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </div>
  );
};

export default MessageForm;

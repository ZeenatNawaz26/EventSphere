import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Messages = () => {
  const { expoId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [userId, setUserId] = useState(null); // Initially null
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId) {
        console.error("User ID is missing!");
        return;
      }
  
      const apiUrl = `http://localhost:8000/api/messages/${expoId}/${userId}`;
      console.log("Fetching messages from:", apiUrl);
  
      try {
        const response = await axios.get(apiUrl);
        if (response.data.success) {
          setMessages(response.data.messages);
        } else {
          console.error("Error fetching messages:", response.data.error);
        }
      } catch (error) {
        console.error("API Request Failed:", error);
      }
    };
  
    fetchMessages();
  }, [expoId, userId]);
  
  const sendMessage = async () => {
    if (!userId) {
      alert("User ID is missing! Please log in again.");
      navigate("/login");
      return;
    }
    if (!receiverId) {
      alert("Please enter a receiver ID!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/messages/send", {
        senderId: userId,
        receiverId,
        expoId,
        message: newMessage,
      });

      setNewMessage("");
      setMessages((prevMessages) => [
        { senderId: userId, message: newMessage, timestamp: new Date().toISOString() },
        ...prevMessages,
      ]);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">📩 Messages</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2">
          Send
        </button>
      </div>

      <h3 className="text-lg font-semibold">📜 Message History</h3>
      <ul>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <li key={index} className="border p-2 my-2">
              <strong>{msg.senderId}:</strong> {msg.message}{" "}
              <span>({msg.timestamp ? new Date(msg.timestamp).toLocaleString() : "No timestamp"})</span>
            </li>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </ul>
    </div>
  );
};

export default Messages;

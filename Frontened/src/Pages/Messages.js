import React, { useState, useEffect } from "react";
import MessageForm from "../Components/MessageForm";
import MessageList from "../Components/MessageList";
import "../App.css";
const Messages = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      console.log("✅ User found in localStorage:", JSON.parse(storedUser));
    } else {
      console.warn("⚠️ No user found in localStorage!");
    }
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <MessageForm />

      {currentUser ? (
        <MessageList userId={currentUser.id} />
      ) : (
        <p>⚠️ User not logged in. Please log in first.</p>
      )}
    </div>
  );
};

export default Messages;

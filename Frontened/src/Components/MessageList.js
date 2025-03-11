
// import React, { useState, useEffect } from "react";
// import { List, ListItem, ListItemText } from "@mui/material";
// import { getMessages } from "../Components/messageService";

// const MessageList = ({ userId }) => {
//   const [messages, setMessages] = useState([]);

//   // Debugging logs
//   console.log("🔥 Received userId in MessageList:", userId);

//   useEffect(() => {
//     if (!userId) {
//       console.warn("⚠️ No userId found in MessageList");
//       return;
//     }

//     async function fetchMessages() {
//       try {
//         console.log("📨 Fetching messages for userId:", userId);
//         const msgs = await getMessages(userId);
//         console.log("✅ Fetched Messages:", msgs);
//         setMessages(msgs);
//       } catch (error) {
//         console.error("❌ Error fetching messages:", error);
//       }
//     }

//     fetchMessages();
//   }, [userId]);

//   return (
//     <List>
//       {messages.length > 0 ? (
//         messages.map((msg) => (
//           <ListItem key={msg._id}>
//             <ListItemText primary={msg.message} secondary={`To: ${msg.receiverId?.name || "Unknown"}`} />
//           </ListItem>
//         ))
//       ) : (
//         <p>⚠️ No messages found.</p>
//       )}
//     </List>
//   );
// };

// export default MessageList;  yeh notification wala coe fix krka do import React, { useState } from "react";
// import axios from "axios";

// const MessageList = ({ messages, userId }) => {
//   const [replyText, setReplyText] = useState("");

//   const handleReply = async (messageId) => {
//     try {
//       await axios.post(`http://localhost:8000/api/messages/reply/${messageId}`, {
//         senderId: userId,
//         message: replyText,
//       });

//       alert("Reply sent!");
//       setReplyText("");
//       window.location.reload();
//     } catch (error) {
//       console.error("Error sending reply:", error);
//     }
//   };

//   return (
//     <div>
//       {messages.map((msg) => (
//         <div key={msg._id} className="message-item">
//           <p>
//             <strong>{msg.senderId.name}</strong>: {msg.message}
//           </p>
//           {msg.replies.length > 0 && (
//             <div className="replies">
//               {msg.replies.map((reply, index) => (
//                 <p key={index}>
//                   <strong>Reply:</strong> {reply.message}
//                 </p>
//               ))}
//             </div>
//           )}
//           <input
//             type="text"
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             placeholder="Type a reply..."
//           />
//           <button onClick={() => handleReply(msg._id)}>Reply</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageList;
 

// import React, { useState, useEffect } from "react";
// import { List, ListItem, ListItemText, TextField, Button, Badge } from "@mui/material";
// import axios from "axios";
// import { getMessages } from "../Components/messageService";
// import "../App.css";
// const MessageList = ({ userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [replyText, setReplyText] = useState({}); // ✅ Fix: Maintain separate replies per message
//   const [unreadCount, setUnreadCount] = useState(0);

//   console.log("🔥 Received userId in MessageList:", userId);

//   useEffect(() => {
//     if (!userId) {
//       console.warn("⚠️ No userId found in MessageList");
//       return;
//     }

//     async function fetchMessages() {
//       try {
//         console.log("📨 Fetching messages for userId:", userId);
//         const msgs = await getMessages(userId);
//         console.log("✅ Fetched Messages:", msgs);
//         setMessages(msgs);

//         // Count unread messages
//         const unread = msgs.filter((msg) => !msg.isRead).length;
//         setUnreadCount(unread);
//       } catch (error) {
//         console.error("❌ Error fetching messages:", error);
//       }
//     }

//     fetchMessages();
//   }, [userId]);

//   const handleReply = async (messageId) => {
//     if (!messageId || !replyText[messageId]) {
//       console.error("❌ Invalid message ID or empty reply");
//       return;
//     }

//     try {
//       console.log("🔄 Sending reply to:", messageId);

//       await axios.put(`http://localhost:8000/api/messages/reply/${messageId}`, {
//         senderId: userId, 
//         message: replyText[messageId],  // ✅ Fix: Sending correct reply text
//       });

//       alert("✅ Reply sent!");
//       setReplyText({ ...replyText, [messageId]: "" }); // ✅ Fix: Reset only this message's reply input
//       window.location.reload();
//     } catch (error) {
//       console.error("❌ Error sending reply:", error.response?.data || error.message);
//     }
//   };

//   const markAsRead = async (messageId) => {
//     try {
//       const response = await axios.put(`http://localhost:8000/api/messages/mark-as-read/${messageId}`);
  
//       if (response.data.success) {
//         // ✅ Update only the relevant message state
//         setMessages((prevMessages) =>
//           prevMessages.map((msg) =>
//             msg._id === messageId ? { ...msg, isRead: true } : msg
//           )
//         );
//         setUnreadCount((prev) => Math.max(prev - 1, 0));
//       } else {
//         console.error("❌ Failed to mark message as read");
//       }
//     } catch (error) {
//       console.error("Error marking as read:", error);
//     }
//   };
  

//   return (
//     <div>
//       <h3>
//         Messages{" "}
//         <Badge badgeContent={unreadCount} color="error">
//           🔔
//         </Badge>
//       </h3>

//       <List>
//         {messages.length > 0 ? (
//           messages.map((msg) => (
//             <ListItem key={msg._id} style={{ background: msg.isRead ? "#f9f9f9" : "#dff7df", marginBottom: "10px" }}>
//               <ListItemText primary={`From: ${msg.senderId?.name || "Unknown"}`} secondary={msg.message} />

//               {!msg.isRead && <Button onClick={() => markAsRead(msg._id)}>Mark as Read</Button>}

//               {/* Replies Section */}
//               {msg.replies.length > 0 && (
//                 <div>
//                   {msg.replies.map((reply, index) => (
//                     <p key={index} style={{ marginLeft: "20px", color: "gray" }}>
//                       <strong>Reply:</strong> {reply.message}
//                     </p>
//                   ))}
//                 </div>
//               )}

//               {/* Reply Input */}
//               <TextField
//                 size="small"
//                 value={replyText[msg._id] || ""} // ✅ Fix: Each message has its own reply text
//                 onChange={(e) => setReplyText({ ...replyText, [msg._id]: e.target.value })} // ✅ Fix: Update only the relevant reply
//                 placeholder="Type a reply..."
//               />
//               <Button onClick={() => handleReply(msg._id)} variant="contained" color="primary">
//                 Reply
//               </Button>
//             </ListItem>
//           ))
//         ) : (
//           <p>⚠️ No messages found.</p>
//         )}
//       </List>
//     </div>
//   );
// };

// export default MessageList;



import React, { useState, useEffect, useCallback } from "react";
import { List, ListItem, ListItemText, TextField, Button, Badge, CircularProgress } from "@mui/material";
import axios from "axios";
import { getMessages } from "../Components/messageService";
import "../App.css";

const MessageList = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    if (!userId) {
      console.warn("⚠️ No userId found in MessageList");
      return;
    }

    try {
      setLoading(true);
      const msgs = await getMessages(userId);
      setMessages(msgs);
      setUnreadCount(msgs.filter((msg) => !msg.isRead).length);
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
      alert("Error fetching messages. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchMessages();
    return () => console.log("🧹 Cleanup: MessageList unmounted");
  }, [fetchMessages]);

  const handleReply = async (messageId) => {
    if (!messageId || !replyText[messageId]?.trim()) {
      alert("⚠️ Please enter a reply before sending.");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/messages/reply/${messageId}`, {
        senderId: userId,
        message: replyText[messageId],
      });

      alert("✅ Reply sent!");
      setReplyText((prev) => ({ ...prev, [messageId]: "" })); // ✅ Reset only this message's reply
      fetchMessages(); // Refresh messages after replying
    } catch (error) {
      console.error("❌ Error sending reply:", error);
      alert("Failed to send reply. Try again.");
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/messages/mark-as-read/${messageId}`);
      if (response.data.success) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg._id === messageId ? { ...msg, isRead: true } : msg))
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("❌ Error marking as read:", error);
    }
  };

  return (
    <div className="message-container">
      <h3>
        Messages{" "}
        <Badge badgeContent={unreadCount} color="error">
          🔔
        </Badge>
      </h3>

      {loading ? (
        <CircularProgress />
      ) : messages.length > 0 ? (
        <List>
          {messages.map((msg) => (
            <ListItem key={msg._id} style={{ background: msg.isRead ? "#f9f9f9" : "#dff7df", marginBottom: "10px" }}>
              <ListItemText primary={`From: ${msg.senderId?.name || "Unknown"}`} secondary={msg.message} />

              {!msg.isRead && (
                <Button onClick={() => markAsRead(msg._id)} variant="outlined" color="secondary">
                  Mark as Read
                </Button>
              )}

              {/* Replies Section */}
              {msg.replies.length > 0 && (
                <div>
                  {msg.replies.map((reply, index) => (
                    <p key={index} style={{ marginLeft: "20px", color: "gray" }}>
                      <strong>Reply:</strong> {reply.message}
                    </p>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              <TextField
                size="small"
                value={replyText[msg._id] || ""}
                onChange={(e) => setReplyText({ ...replyText, [msg._id]: e.target.value })}
                placeholder="Type a reply..."
              />
              <Button onClick={() => handleReply(msg._id)} variant="contained" color="primary">
                Reply
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>⚠️ No messages found.</p>
      )}
    </div>
  );
};

export default MessageList;

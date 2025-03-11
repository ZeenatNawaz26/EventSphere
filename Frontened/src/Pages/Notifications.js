import React, { useState } from "react";
import NotificationList from "../Components/NotificationList";
import ReplyModal from "../Components/ReplyModal";

const Notifications = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <div>
      <h1>Notifications</h1>
      <NotificationList onReply={(msg) => setSelectedMessage(msg)} />
      {selectedMessage && (
        <ReplyModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
      )}
    </div>
  );
};

export default Notifications;

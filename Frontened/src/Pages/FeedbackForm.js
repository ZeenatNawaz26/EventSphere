import { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ userId }) => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  // Handle input click when user is not logged in
  const handleInputClick = () => {
    if (!userId) {
      alert("⚠️ Please log in first before submitting feedback.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("⚠️ Please log in to submit feedback.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/feedback/submit", {
        userId,
        message,
      });
      setSuccess("✅ Feedback submitted successfully!");
      setMessage(""); // Clear form
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center" }}>Submit Feedback</h2>
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          style={{ width: "100%", height: "100px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "none" }}
          placeholder="Write your feedback..."
          value={message}
          onClick={handleInputClick} // ✅ Show popup if user is not logged in
          onChange={(e) => {
            if (userId) {
              setMessage(e.target.value);
            }
          }}
          required
        />
        <button
          style={{ width: "100%", marginTop: "10px", padding: "10px", background: "#d9232d", // Red Button
            color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

import axios from "axios";

const API_URL = "http://localhost:8000/api/messages";

// export const sendMessage = async (receiverId, message) => {
//   await axios.post(`${API_URL}/send`, { senderId: "USER_ID", receiverId, message });
// };
export const sendMessage = async (receiverId, message) => {
  try {
    const senderId = localStorage.getItem("userId"); // ✅ Sender ID localStorage se lo
    if (!senderId) {
      throw new Error("Sender ID not found in localStorage");
    }

    const response = await axios.post(`${API_URL}/send`, { senderId, receiverId, message });
    return response.data;
  } catch (error) {
    console.error("Error in sendMessage:", error.response?.data || error.message);
  }
};

// export const getMessages = async (userId) => {
//   const response = await axios.get(`${API_URL}/${userId}`);
//   return response.data;
// };


export const getMessages = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/messages/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getMessages:", error);
    return [];
  }
};


export const getUsers = async () => {
  const response = await axios.get("http://localhost:8000/api/users"); // Assume user endpoint exists
  return response.data;
};

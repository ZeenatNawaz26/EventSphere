import axios from "axios";

const MONGO_URI = "http://localhost:8000/api/users"; // Adjust if needed

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(MONGO_URI);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(MONGO_URI, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${MONGO_URI}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

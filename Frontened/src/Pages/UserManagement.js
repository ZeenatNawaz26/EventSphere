import React, { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../Components/userService";
import { Button, Table } from "react-bootstrap"; // Use Bootstrap for UI

const UserManagement = ({ token }) => {
  const [users, setUsers] = useState([]);

  console.log("🛠️ UserManagement Component Mounted | Token:", token);

  // ✅ Fetch users from API
  useEffect(() => {
    const fetchUsersData = async () => {
      console.log("🔄 Fetching users from API...");
      try {
        const data = await getUsers(token);
        setUsers(data);
        console.log("✅ Users Fetched Successfully:", data);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, [token]);

  // ✅ Handle delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("🗑️ Deleting User:", id);
      try {
        await deleteUser(id, token);
        setUsers(users.filter((user) => user._id !== id));
        console.log("✅ User Deleted Successfully:", id);
      } catch (error) {
        console.error("❌ Error deleting user:", error);
      }
    } else {
      console.log("⚠️ Delete Action Canceled");
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;

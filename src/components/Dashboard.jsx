import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 import for navigation
import useAuthStore from "../store/authStore";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate(); // 👈 get navigate function

  const handleLogout = () => {
    logout();        // Clear token and user
    navigate("/");   // 👈 Redirect to login page
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>
      <p>User ID: {user?.id}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
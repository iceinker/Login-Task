import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import "./Dashboard.css";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="welcome-text">Welcome back, {user?.name || "User"} 👋</h1>
        <p className="user-info">User ID: <span>{user?.id}</span></p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
import React from "react";
import useAuthStore from "../store/authStore";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>
      <p>User ID: {user?.id}</p>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
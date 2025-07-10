import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";

export default function AppRouter() {
  const token = useAuthStore((state) => state.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Dashboard onLogout={() => (window.location.href = "/")} />
            ) : (
              <LoginForm onSuccess={() => (window.location.href = "/")} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

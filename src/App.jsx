import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import useAuthStore from "./store/authStore";

function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
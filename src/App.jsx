import React from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import useAuthStore from "./store/authStore";

function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <div>
      {token ? (
        <Dashboard />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
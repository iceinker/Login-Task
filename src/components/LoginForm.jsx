import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { login, fetchUserInfo } from "../api/auth";

export default function LoginForm({ onSuccess }) {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email format");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    try {
      const data = await login(email, password);
      setToken(data.token);

      const user = await fetchUserInfo(data.token);
      setUser(user);

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
        required
      />
      {error && <p className="error">{error}</p>}
      <button
        type="submit"
        disabled={!email || !password || loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

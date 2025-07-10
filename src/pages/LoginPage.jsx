import React, { useState } from "react";
import "./LoginPage.css";
import useAuthStore from "../store/authStore";

// Import logos
import logo1 from "../assets/meetusvr design element 02 (1) 1.png";
import logo2 from "../assets/meetusvr design element 04 2.png";
import logo3 from "../assets/meetusvr 3d logo-01 2.png";

export default function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@") || !email.includes(".")) {
      setError("❌ Invalid email format");
      return;
    }
    if (!password) {
      setError("❌ Password is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            isEmployee: true,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("❌ Invalid credentials");
      }

      const data = await res.json();
      setToken(data.token);

      const userRes = await fetch(
        "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (!userRes.ok) {
        throw new Error("❌ Failed to fetch user info");
      }

      const userData = await userRes.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outer-frame">
      {/* Ellipses Background */}
      <div className="ellipse ellipse1"></div>
      <div className="ellipse ellipse2"></div>
      <div className="ellipse ellipse3"></div>
      <div className="ellipse ellipse4"></div>

      {/* Left Frame: Login Form */}
      <div className="login-left">
        <div className="form-container">
          <div className="titles">
            <h1>Welcome Back</h1>
            <p>
              Step into our shopping metaverse for an unforgettable shopping
              experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="inputs">
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
              className="login-btn"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account? <span>Sign up</span>
          </p>
        </div>
      </div>

      {/* Right Frame: Logos */}
      <div className="login-right">
        <div className="logo-frame">
          <div className="logo-stack">
            <img src={logo2} alt="Logo 2" className="logo logo2" />
            <img src={logo1} alt="Logo 1" className="logo logo1" />
          </div>
        </div>
        <img src={logo3} alt="Logo 3" className="logo3" />
      </div>
    </div>
  );
}

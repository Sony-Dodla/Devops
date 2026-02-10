import React, { useState } from "react";
import api from "../api";
import { setAuth } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/login", { email, password });
      setAuth(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            style={{ width: "100%", padding: 8 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            style={{ width: "100%", padding: 8 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 16, fontSize: 13 }}>
        Demo creds: user1@gmail.com / 123456
      </p>
    </div>
  );
}
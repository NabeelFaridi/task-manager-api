import { useState } from "react";
import { api } from "../api";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        const data = await api.login(username, password);
        if (data.token) {
          onLogin(username);
        } else {
          setError("Invalid username or password.");
        }
      } else {
        const data = await api.register(username, password);
        if (data.message) {
          const loginData = await api.login(username, password);
          if (loginData.token) onLogin(username);
        } else {
          setError(data || "Registration failed.");
        }
      }
    } catch {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">✦</div>
        <h1 className="auth-title">Task Manager</h1>
        <p className="auth-subtitle">{isLogin ? "Welcome back" : "Create your account"}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your username"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "No account?" : "Already have one?"}{" "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }}>
            {isLogin ? "Register" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

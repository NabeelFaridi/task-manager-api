import { useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(
    localStorage.getItem("token") ? localStorage.getItem("username") : null
  );

  const handleLogin = (username) => {
    localStorage.setItem("username", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUser(null);
  };

  return user ? (
    <Dashboard username={user} onLogout={handleLogout} />
  ) : (
    <Auth onLogin={handleLogin} />
  );
}

import { useState, useEffect } from "react";
import { api } from "../api";

export default function Dashboard({ username, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    const data = await api.getTasks();
    setTasks(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await api.createTask({ title, description, isCompleted: false });
    setTitle("");
    setDescription("");
    loadTasks();
  };

  const handleToggle = async (task) => {
    await api.updateTask(task.id, {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted,
    });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await api.deleteTask(id);
    loadTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.isCompleted;
    if (filter === "done") return t.isCompleted;
    return true;
  });

  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="dash-brand">✦ Tasks</div>
        <div className="dash-user">
          <span>{username}</span>
          <button onClick={handleLogout} className="btn-logout">Sign out</button>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-stats">
          <div className="stat">
            <span className="stat-number">{tasks.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number">{tasks.length - completedCount}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>

        <form onSubmit={handleCreate} className="create-form">
          <div className="create-inputs">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="input-title"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)"
              className="input-desc"
            />
          </div>
          <button type="submit" className="btn-add">Add Task</button>
        </form>

        <div className="filter-bar">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "active" : ""}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="task-list">
          {loading ? (
            <div className="empty-state">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              {filter === "all" ? "No tasks yet. Add one above!" : `No ${filter} tasks.`}
            </div>
          ) : (
            filtered.map((task) => (
              <div key={task.id} className={`task-card ${task.isCompleted ? "completed" : ""}`}>
                <button
                  className={`task-check ${task.isCompleted ? "checked" : ""}`}
                  onClick={() => handleToggle(task)}
                >
                  {task.isCompleted ? "✓" : ""}
                </button>
                <div className="task-content">
                  <p className="task-title">{task.title}</p>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                </div>
                <button
                  className="task-delete"
                  onClick={() => handleDelete(task.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

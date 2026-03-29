const BASE_URL = process.env.REACT_APP_API_URL || "https://task-manager-api-production-e409.up.railway.app";

const getHeaders = () => ({
  "Content-Type": "application/json",
  ...(localStorage.getItem("token") && {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }),
});

export const api = {
  register: (username, password) =>
    fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    }).then((r) => r.json()),

  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) localStorage.setItem("token", data.token);
    return data;
  },

  getTasks: () =>
    fetch(`${BASE_URL}/api/tasks`, { headers: getHeaders() }).then((r) =>
      r.json()
    ),

  createTask: (task) =>
    fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(task),
    }).then((r) => r.json()),

  updateTask: (id, task) =>
    fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(task),
    }),

  deleteTask: (id) =>
    fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }),
};

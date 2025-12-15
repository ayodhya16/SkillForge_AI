// src/services/auth.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sf_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login(credentials) {
  const res = await api.post("/auth/login", credentials);
  if (res.status === 200 && res.data?.token) {
    localStorage.setItem("sf_token", res.data.token);
    localStorage.setItem("sf_role", res.data.role || "");
    localStorage.setItem("sf_name", res.data.name || "");
    try { window.dispatchEvent(new Event("sf_auth_changed")); } catch {}
  }
  return res.data;
}

export async function register(payload) {
  const res = await api.post("/auth/register", payload);
  // optionally auto-login after register (if backend returns token) — not done here
  return res.data;
}

export function logout() {
  localStorage.removeItem("sf_token");
  localStorage.removeItem("sf_role");
  localStorage.removeItem("sf_name");
}

export function isAuthenticated() {
  return !!localStorage.getItem("sf_token");
}

export function getRole() {
  return localStorage.getItem("sf_role") || null;
}

export default api;

import axios from "../api/axiosInstance";

export async function register(user) {
  const res = await axios.post("/api/auth/register", user);
  return res.data;
}

export async function login(credentials) {
  const res = await axios.post("/api/auth/login", credentials);
  if (res.status === 200 && res.data?.token) {
    localStorage.setItem("sf_token", res.data.token);
    localStorage.setItem("sf_role", res.data.role);
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem("sf_token");
  localStorage.removeItem("sf_role");
}

//export function getCurrentUserRole() {
//  return localStorage.getItem("sf_role");
//}
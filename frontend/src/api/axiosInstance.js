import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // change if backend address differs
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("sf_token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

axiosInstance.interceptors.response.use(res => res, err => {
  // You can handle global errors here (401 -> redirect to login etc.)
  return Promise.reject(err);
});

export default axiosInstance;

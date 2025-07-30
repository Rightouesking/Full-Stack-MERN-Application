import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-url.onrender.com/api",
});

API.interceptors.request.use(config => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
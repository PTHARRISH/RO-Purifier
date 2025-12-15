// axiosInstance.jsx
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., http://127.0.0.1:8000/api
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

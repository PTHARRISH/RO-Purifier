// authService.jsx
import axiosInstance from "./axiosInstance";

// Register user based on role
export const registerUser = (role, payload) => {
  // Role can be 'user', 'admin', 'technician'
  return axiosInstance.post(`/register/${role}/`, payload);
};

// Login user
export const loginUser = (payload) => {
  return axiosInstance.post("/login/", payload);
};

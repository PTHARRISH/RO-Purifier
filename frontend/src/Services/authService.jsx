// src/Services/authService.js
import axiosInstance from "./axiosInstance";

export const registerUser = (payload) => {
  return axiosInstance.post("register/user/", payload);
};

export const registerAdmin = (payload) => {
  return axiosInstance.post("register/admin/", payload);
};

export const loginUser = async (payload) => {
  const response = await axiosInstance.post("login/", payload);
  
  // Store tokens (adjust based on your API response)
  if (response.data.access) {
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
  } else if (response.data.token) {
    localStorage.setItem("accessToken", response.data.token);
  }
  
  return response;
};

export const logoutUser = () => {
  localStorage.clear();
};

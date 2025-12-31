// src/Services/authService.js - ✅ FIXED RESPONSE HANDLING
import axiosInstance from "./axiosInstance";

export const registerUser = (payload) => {
  return axiosInstance.post("register/user/", payload);
};

export const registerAdmin = (payload) => {
  return axiosInstance.post("register/admin/", payload);
};

export const loginUser = async (payload) => {
  const response = await axiosInstance.post("login/", payload);
  
  console.log("🔑 Login Response:", response.data); // ✅ DEBUG
  
  // ✅ FIXED: Match your actual backend response structure
  // Assuming backend returns: { role, username, fullname, tokens: {access, refresh} }
  
  // Store tokens
  if (response.data.tokens?.access) {
    localStorage.setItem("accessToken", response.data.tokens.access);
    if (response.data.tokens.refresh) {
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
    }
  } else if (response.data.access) {
    localStorage.setItem("accessToken", response.data.access);
  }

  // ✅ FIXED: Store user data IMMEDIATELY from response
  localStorage.setItem('userRole', response.data.role || response.data.user?.role);
  localStorage.setItem('username', response.data.username || response.data.user?.username);
  localStorage.setItem('fullname', response.data.fullname || response.data.user?.fullname || response.data.user?.full_name);
  localStorage.setItem('email', response.data.email || response.data.user?.email);
  localStorage.setItem('userId', response.data.user_id || response.data.user?.id || response.data.id);

  console.log("💾 Stored User Data:", {
    role: localStorage.getItem('userRole'),
    username: localStorage.getItem('username'),
    token: localStorage.getItem('accessToken') ? '✅' : '❌'
  });
  
  return response;
};

export const logoutUser = () => {
  const keysToRemove = [
    'accessToken', 'refreshToken', 'userRole', 'username', 
    'fullname', 'userId', 'email'
  ];
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  delete axiosInstance.defaults.headers.common['Authorization'];
  
  console.log("🔓 Logged out - Storage cleared");
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token');
  
  const response = await axiosInstance.post("token/refresh/", { refresh: refreshToken });
  if (response.data.access) {
    localStorage.setItem("accessToken", response.data.access);
    return response.data.access;
  }
  throw new Error('Token refresh failed');
};

// ✅ UTILITY FUNCTIONS
export const getCurrentUserRole = () => localStorage.getItem('userRole');
export const isAuthenticated = () => !!localStorage.getItem('accessToken');
export const getUserInfo = () => ({
  userId: localStorage.getItem('userId'),
  role: localStorage.getItem('userRole'),
  username: localStorage.getItem('username'),
  fullname: localStorage.getItem('fullname'),
  email: localStorage.getItem('email')
});

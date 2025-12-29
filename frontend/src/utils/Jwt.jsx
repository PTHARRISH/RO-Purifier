// src/utils/Jwt.js - USE BACKEND ROLE INFO
import { jwtDecode } from 'jwt-decode';

export function getUserFromToken() {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log("❌ NO TOKEN");
      return null;
    }

    const decoded = jwtDecode(token);
    console.log("🔍 TOKEN DATA:", decoded);

    // ✅ PRIORITY: Use backend role from API response (stored separately)
    // For now, use ID mapping since JWT doesn't have role
    const backendRole = localStorage.getItem('userRole'); // From login response
    
    const user = {
      id: decoded.user_id,
      username: localStorage.getItem('username') || `user-${decoded.user_id}`,
      email: `user${decoded.user_id}@shop.com`,
      // ✅ USE BACKEND ROLE FIRST, then fallback
      role: backendRole || (decoded.user_id === "23" ? "admin" : "user"),
      fullname: localStorage.getItem('fullname') || `User ${decoded.user_id}`,
    };

    console.log("🎯 FINAL USER:", user);
    return user;

  } catch (error) {
    console.error("❌ JWT ERROR:", error);
    localStorage.removeItem('accessToken');
    return null;
  }
}

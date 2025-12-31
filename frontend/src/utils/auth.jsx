// src/utils/auth.js
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getUserFromToken } from "./Jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Initialize auth from token
  const initializeAuth = useCallback(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decodedUser = getUserFromToken();
      setUser(decodedUser);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // ✅ FIXED LOGIN (NO REFRESH)
  const login = useCallback((token) => {
    localStorage.setItem("accessToken", token);

    const decodedUser = getUserFromToken();
    setUser(decodedUser);        // ✅ INSTANT UI UPDATE
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

// src/utils/auth.js - NO CACHE PROBLEMS
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserFromToken } from './Jwt';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializeAuth = useCallback(() => {
    console.log("🔄 INIT AUTH...");
    const token = localStorage.getItem('accessToken');
    if (token) {
      const newUser = getUserFromToken();
      console.log("🔄 INIT USER:", newUser);
      setUser(newUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback((token) => {
    console.log("🔄 LOGIN TOKEN...");
    localStorage.setItem('accessToken', token);
    
    // ✅ FORCE FRESH DECODE
    const newUser = getUserFromToken();
    console.log("🔄 NEW USER:", newUser);
    
    if (newUser) {
      setUser(newUser);
      return newUser;
    }
    return null;
  }, []);

  const logout = useCallback(() => {
    console.log("🔄 LOGOUT...");
    localStorage.removeItem('accessToken');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import React from "react";
import { Navigate } from "react-router-dom";

// Protect routes that require authentication
export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    // Redirect to signup if not logged in
    return <Navigate to="/signup" replace />;
  }

  return children;
}

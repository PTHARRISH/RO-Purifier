// src/ProtectedRoutes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/Jwt";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/"} replace />;
  }

  return children;
}

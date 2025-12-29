// src/App.jsx - PERFECT: ANY USER=LandingPage | ANY ADMIN=HomeAdmin
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetails from "./Pages/ProductsDetails";
import Cart from "./Pages/Cart";
import AboutUs from "./Pages/About";
import Contact from "./Pages/Contact";
import HomeAdmin from "./Admin/HomeAdmin";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRote";
import Settings from "./Profile/ProfileSettings";
import Profile from "./Profile/Profile";
import Navbar from "./reusableComponents/Navbar";
import { useAuth } from "./utils/auth";

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
}

// ✅ PERFECT LOGIC: role="user" → LandingPage | role="admin" → HomeAdmin
function HomePage() {
  const { user, loading } = useAuth();

  console.log("🎯 HomePage:", { 
    userId: user?.id, 
    role: user?.role,
    isUser: user?.role === "user",
    isAdmin: user?.role === "admin",
    loading
  });

  if (loading) return <LoadingSpinner />;

  // ✅ GUEST → LandingPage
  if (!user) {
    console.log("✅ GUEST → LANDING PAGE");
    return (
      <>
        <Navbar />
        <LandingPage />
      </>
    );
  }

  // ✅ ANY USER (role="user") → LANDING PAGE
  if (user.role === "user") {
    console.log("✅ USER (", user.id, ") → LANDING PAGE");
    return (
      <>
        <Navbar />
        <LandingPage />
      </>
    );
  }

  // ✅ ANY ADMIN (role="admin") → HOMEADMIN
  if (user.role === "admin") {
    console.log("✅ ADMIN (", user.id, ") → HOMEADMIN");
    return (
      <>
        <Navbar />
        <HomeAdmin />
      </>
    );
  }

  // ✅ FALLBACK → LANDING PAGE
  console.log("✅ FALLBACK → LANDING PAGE");
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      
      <Route path="/products" element={<ProtectedRoute allowedRoles={["user"]}><ProductsPage /></ProtectedRoute>} />
      <Route path="/product/:id" element={<ProtectedRoute allowedRoles={["user"]}><ProductDetails /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute allowedRoles={["user"]}><Cart /></ProtectedRoute>} />
      
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><HomeAdmin /></ProtectedRoute>} />
      
      <Route path="/profile" element={<ProtectedRoute allowedRoles={["user"]}><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={["user"]}><Settings /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

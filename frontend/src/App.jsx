// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./utils/auth";

/* Pages */
import LandingPage from "./Pages/LandingPage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetails from "./Pages/ProductsDetails";
import Cart from "./Pages/Cart";
import AboutUs from "./Pages/About";
import Contact from "./Pages/Contact";

/* Auth Pages */
import Login from "./Authentication/Login";
import SignupUser from "./Authentication/SignupUser";
import SignupAdmin from "./Authentication/SignupAdmin";

/* Profile */
import Profile from "./Profile/Profile";
import Settings from "./Profile/ProfileSettings";

/* Admin */
import HomeAdmin from "./Admin/HomeAdmin";

/* Components */
import Navbar from "./reusableComponents/Navbar";
import AdminNavbar from "./reusableComponents/AdminNavbar";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRote";

/* Loading Spinner */
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
    </div>
  );
}

/* =======================
   HOME PAGE LOGIC
======================= */
function HomePage() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  // 👤 Guest or User → Public Navbar + Landing
  if (!user || user.role === "user") {
    return (
      <>
        <Navbar />
        <LandingPage />
      </>
    );
  }

  // 👑 Admin → Admin Navbar + Admin Home
  if (user.role === "admin") {
    return (
      <>
        <AdminNavbar />
        <HomeAdmin />
      </>
    );
  }

  return <Navigate to="/" replace />;
}

/* =======================
   APP ROUTES
======================= */
export default function App() {
  return (
    <Routes>
      {/* 🌍 PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />

      {/* 🔐 AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup/user" element={<SignupUser />} />
      <Route path="/signup/admin" element={<SignupAdmin />} />

      {/* 👤 USER PROTECTED ROUTES */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <>
              <Navbar />
              <Cart />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <>
              <Navbar />
              <Profile />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <>
              <Navbar />
              <Settings />
            </>
          </ProtectedRoute>
        }
      />

      {/* 👑 ADMIN PROTECTED ROUTES */}
      <Route
        path="/admin/home"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <>
              <AdminNavbar />
              <HomeAdmin />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <>
              <AdminNavbar />
              <HomeAdmin />
            </>
          </ProtectedRoute>
        }
      />

      {/* ❌ FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

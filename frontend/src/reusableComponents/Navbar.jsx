// src/reusableComponents/Navbar.jsx - 100% WORKING + RESPONSIVE
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"; // ✅ ALL fa icons ONLY
import { useCart } from "../context/CartContext";
import { useAuth } from "../utils/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const dropdownRef = useRef(null);

  const cartCount = cart.reduce((total, item) => total + (item.qty || 0), 0);
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    setOpenMobile(false);
  };

  const navigateAndClose = (path) => {
    navigate(path);
    setOpenProfile(false);
    setOpenMobile(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigateAndClose("/")}
          >
            ShopEase
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className={`px-4 py-2 rounded-xl font-semibold transition-all ${location.pathname === "/" ? "bg-blue-100 text-blue-700 shadow-md" : "hover:bg-blue-50 text-gray-700"}`}>
              Home
            </button>
            {isAuthenticated && user?.role === "user" && (
              <button onClick={() => navigate("/products")} className={`px-4 py-2 rounded-xl font-semibold transition-all ${location.pathname.startsWith("/products") ? "bg-blue-100 text-blue-700 shadow-md" : "hover:bg-blue-50 text-gray-700"}`}>
                Shop
              </button>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart */}
            {isAuthenticated && user?.role === "user" && (
              <div className="relative">
                <button 
                  onClick={() => navigate("/cart")}
                  className="p-2 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all text-gray-700"
                >
                  <FaShoppingCart size={20} />
                </button>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-lg border-2 border-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
            )}

            {/* Profile / Auth */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex gap-3">
                <button onClick={() => navigate("/login")} className="px-4 py-2 text-sm border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 hover:shadow-md transition-all">
                  Login
                </button>
                <button onClick={() => navigate("/signup")} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-semibold text-sm">{user.username}</div>
                    <div className="text-xs text-gray-500">{user.role?.toUpperCase()}</div>
                  </div>
                </button>

                {openProfile && (
                  <div className="absolute right-0 mt-2 w-72 bg-white shadow-2xl rounded-2xl border border-gray-200 py-3 px-4 z-50">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-3 border-b">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {user.username?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-base">{user.username}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <span className={`px-2 py-1 text-xs font-bold rounded-full mt-1 ${
                          user.role === "admin" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}>
                          {user.role?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      {user.role === "admin" ? (
                        <button onClick={() => navigateAndClose("/admin/dashboard")} className="w-full p-3 text-left hover:bg-gray-50 rounded-xl font-semibold flex items-center gap-2">
                          🛠️ Admin Dashboard
                        </button>
                      ) : (
                        <button onClick={() => navigateAndClose("/products")} className="w-full p-3 text-left hover:bg-gray-50 rounded-xl font-semibold flex items-center gap-2">
                          🛒 Shop
                        </button>
                      )}
                      <button onClick={() => navigateAndClose("/profile")} className="w-full p-3 text-left hover:bg-gray-50 rounded-xl font-semibold flex items-center gap-2">
                        👤 Profile
                      </button>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-xl font-semibold border-t pt-3">
                      <FaSignOutAlt size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-all"
              onClick={() => setOpenMobile(!openMobile)}
            >
              {openMobile ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {openMobile && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
            <div className="p-6 space-y-4">
              {!isAuthenticated ? (
                <>
                  <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all" onClick={() => navigateAndClose("/login")}>
                    Login
                  </button>
                  <button className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all" onClick={() => navigateAndClose("/signup")}>
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {user.username?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold">{user.username}</div>
                      <div className="text-sm text-gray-600 capitalize">{user.role}</div>
                    </div>
                  </div>
                  <button className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold border" onClick={handleLogout}>
                    <FaSignOutAlt size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

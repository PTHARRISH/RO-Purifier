// src/reusableComponents/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../utils/auth";

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = !!user && !isLoading;

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
  };

  const handleCartClick = () => {
    console.log("🛒 NAVIGATING TO CART");
    navigate("/cart");
    setOpenProfile(false);
    setOpenMobile(false);
  };

  const navigateAndClose = (path) => {
    navigate(path);
    setOpenProfile(false);
    setOpenMobile(false);
  };

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 h-16 flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigateAndClose("/")}
          >
            ShopEase
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className={`px-4 py-2 rounded-xl font-semibold transition-all ${location.pathname === "/" ? "bg-blue-100 text-blue-700 shadow-md" : "hover:bg-blue-50 text-gray-700"}`}>Home</button>
            <button onClick={() => navigate("/about")} className={`px-4 py-2 rounded-xl font-semibold transition-all ${location.pathname === "/about" ? "bg-blue-100 text-blue-700 shadow-md" : "hover:bg-blue-50 text-gray-700"}`}>About</button>
            <button onClick={() => navigate("/contact")} className={`px-4 py-2 rounded-xl font-semibold transition-all ${location.pathname === "/contact" ? "bg-blue-100 text-blue-700 shadow-md" : "hover:bg-blue-50 text-gray-700"}`}>Contact</button>
            <button onClick={() => navigate("/products")} className={`px-4 py-2 rounded-xl font-semibold transition-all ${location.pathname.startsWith("/products") ? "bg-blue-100 text-blue-700 shadow-md" : "hover:bg-blue-50 text-gray-700"}`}>Shop</button>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <div className="relative" title="Shopping Cart">
                  <button 
                    onClick={handleCartClick}
                    className="p-3 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all text-gray-700 relative z-10"
                  >
                    <FaShoppingCart size={22} />
                  </button>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-[20px] flex items-center justify-center rounded-full font-bold shadow-lg border-2 border-white animate-pulse">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </div>
              </>
            )}

            {!isAuthenticated ? (
              <div className="hidden md:flex gap-3">
                <button onClick={() => navigate("/login")} className="px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50">Login</button>
                <button onClick={() => navigate("/signup/user")} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all">Sign Up</button>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:block font-semibold">{user.username}</span>
                </button>

                {openProfile && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-2xl rounded-2xl border border-gray-200 py-4 z-50">
                    <div className="px-4 pb-4 border-b">
                      <h3 className="font-bold text-lg">{user.username}</h3>
                      <p className="text-sm text-gray-600">{user.role?.toUpperCase()}</p>
                    </div>
                    <button onClick={() => navigateAndClose("/cart")} className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3">
                      🛒 Cart ({totalItems})
                    </button>
                    <button onClick={() => navigateAndClose("/profile")} className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3">
                      👤 Profile
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-semibold border-t">
                      <FaSignOutAlt size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button 
              className="md:hidden p-2 rounded-xl hover:bg-gray-100"
              onClick={() => setOpenMobile(!openMobile)}
            >
              {openMobile ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {openMobile && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="p-6 space-y-4">
              <button className="w-full text-left py-3 px-4 rounded-xl hover:bg-blue-50" onClick={() => navigateAndClose("/")}>🏠 Home</button>
              <button className="w-full text-left py-3 px-4 rounded-xl hover:bg-blue-50" onClick={() => navigateAndClose("/cart")}>🛒 Shop</button>
              {isAuthenticated && (
                <button className="w-full text-left py-3 px-4 bg-emerald-50 rounded-xl font-semibold" onClick={handleCartClick}>
                  🛒 Cart ({totalItems})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

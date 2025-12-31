import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { logoutUser } from "../Services/authService";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaSearch,
} from "react-icons/fa";

const adminNavLinks = [
  { path: "/admin/home", label: "Dashboard", icon: FaHome },
  { path: "/admin/products", label: "Products", icon: FaBox },
  { path: "/admin/orders", label: "Orders", icon: FaShoppingCart },
  { path: "/admin/customers", label: "Customers", icon: FaUsers },
  { path: "/admin/analytics", label: "Analytics", icon: FaChartBar },
  { path: "/admin/settings", label: "Settings", icon: FaCog },
];

export default function AdminNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const loggingOut = useRef(false);

  /* 🔐 LOGOUT WITHOUT FLICKER */
  const handleLogout = async () => {
    if (loggingOut.current) return;
    loggingOut.current = true;
    await logoutUser();
    navigate("/login", { replace: true });
  };

  /* 🔒 LOCK BODY SCROLL WHEN MOBILE MENU OPEN */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMobileOpen]);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">

      {/* ===================== DESKTOP NAV ===================== */}
      <div className="hidden md:flex px-6 lg:px-8 py-4 max-w-8xl mx-auto items-center justify-between">

        {/* Logo */}
        <Link to="/admin/home" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <FaUser className="text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-gray-900">
              Admin Panel
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              ShopEase Dashboard
            </p>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-8 hidden lg:block">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 ring-indigo-100">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, customers..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          {adminNavLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive(path)
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <Icon size={16} />
              <span className="hidden xl:inline">{label}</span>
            </Link>
          ))}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-4">
          <button className="p-2.5 rounded-xl hover:bg-indigo-50 text-gray-500">
            <FaBell />
          </button>

          <div className="hidden lg:flex items-center gap-3 bg-gray-50 border rounded-xl px-4 py-2">
            <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.fullname?.slice(0, 2)?.toUpperCase() || "AD"}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                {user?.fullname || user?.username}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-600"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* ===================== MOBILE NAV ===================== */}
      <div className="md:hidden px-4 py-4 flex items-center justify-between bg-white">
        <Link to="/admin/home" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <FaUser className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Admin</span>
        </Link>

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-indigo-50 text-gray-500">
            <FaBell />
          </button>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2.5 rounded-xl hover:bg-indigo-50 text-gray-500"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* ===================== MOBILE DRAWER ===================== */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          onClick={() => setIsMobileOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button onClick={() => setIsMobileOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-5 space-y-3">
              {adminNavLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl font-semibold transition ${
                    isActive(path)
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-50 text-red-600 font-semibold"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
}

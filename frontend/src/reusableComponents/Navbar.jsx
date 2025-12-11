import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch, FaTimes, FaBars } from "react-icons/fa";

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Navigate to shop (products) with auth check
  const handleShopClick = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    } else {
      navigate("/products");
    }
    setMobileMenuOpen(false); // close mobile menu on click
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT: LOGO */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-700 cursor-pointer" onClick={() => navigate("/")}>
              Logo
            </span>
          </div>

          {/* CENTER LINKS (Desktop) */}
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <a className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate("/")}>Home</a>
            <span
              className="hover:text-blue-600 transition cursor-pointer"
              onClick={handleShopClick}
            >
              Shop
            </span>
            <a className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate("/")}>Contact</a>
            <a className="hover:text-blue-600 transition cursor-pointer" onClick={() => navigate("/")}>About</a>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-4">

            {/* SEARCH */}
            <div className="relative">
              {isSearchOpen ? (
                <>
                  <input
                    autoFocus
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-48 sm:w-64 border border-gray-300 rounded-full py-1.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setSearchTerm(""); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  <FaSearch size={20} />
                </button>
              )}
            </div>

            {/* CART */}
            <div className="relative cursor-pointer text-gray-700 hover:text-blue-600 transition">
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>

            {/* AUTH BUTTON DESKTOP */}
            {!isAuthenticated ? (
              <button
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            ) : (
              <button
                className="hidden md:block bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            {/* PROFILE ICON */}
            <div className="hidden md:block cursor-pointer text-gray-700 hover:text-blue-600 transition">
              <FaUserCircle size={28} />
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition"
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm py-4 px-6 animate-slideDown">
          <div className="flex flex-col space-y-4 text-gray-700 font-medium">
            <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>Home</span>
            <span className="hover:text-blue-600 transition cursor-pointer" onClick={handleShopClick}>Shop</span>
            <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>Contact</span>
            <span className="hover:text-blue-600 transition cursor-pointer" onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>About</span>

            {/* MOBILE AUTH BUTTON */}
            {!isAuthenticated ? (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm font-semibold transition"
                onClick={() => { navigate("/signup"); setMobileMenuOpen(false); }}
              >
                Sign Up
              </button>
            ) : (
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-full text-sm font-semibold transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            {/* MOBILE PROFILE */}
            <div className="flex items-center space-x-2">
              <FaUserCircle size={26} className="text-gray-700" />
              <span className="text-gray-700">Profile</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

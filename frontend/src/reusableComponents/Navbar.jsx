import { useState } from "react";
import { FaShoppingCart, FaUserCircle, FaSearch, FaTimes } from "react-icons/fa";
import Button from './Button';


export default function Navbar({ cartCount }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Company Name */}
          <div className="flex-1 flex items-center">
            <div className="text-2xl font-bold text-blue-700 whitespace-nowrap">
              Logo
            </div>
          </div>

          {/* Center: Nav Links */}
          <div className="flex-1 hidden md:flex justify-center space-x-8 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600 transition">Home</a>
            <a href="#" className="hover:text-blue-600 transition">Shop</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
            <a href="#" className="hover:text-blue-600 transition">About Us</a>
          </div>

          {/* Right: Search Toggle, Cart, Profile */}
          <div className="flex-1 flex items-center justify-end space-x-4">

            {/* Search toggle and input */}
            <div className="relative">
              {isSearchOpen ? (
                <>
                  <input
                    autoFocus
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-48 sm:w-64 border border-gray-300 rounded-full py-1.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setSearchTerm(""); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Close search"
                  >
                    <FaTimes />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-gray-700 hover:text-blue-600 transition"
                  aria-label="Open search"
                >
                  <FaSearch size={20} />
                </button>
              )}
            </div>

            {/* Cart Icon */}
            <div className="relative cursor-pointer text-gray-700 hover:text-blue-600 transition">
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>

            {/* User Profile Icon */}
            <div className="cursor-pointer text-gray-700 hover:text-blue-600 transition">
              <FaUserCircle size={28} />
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden pb-4 flex justify-center space-x-6 text-gray-700 font-medium">
        <a href="#" className="hover:text-blue-600 transition">Home</a>
        <a href="#" className="hover:text-blue-600 transition">Shop</a>
        <a href="#" className="hover:text-blue-600 transition">Contact</a>
        <a href="#" className="hover:text-blue-600 transition">About Us</a>
      </div>
    </nav>
  );
}

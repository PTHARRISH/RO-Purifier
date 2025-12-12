import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <span
            className="text-2xl font-bold text-blue-700 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Logo
          </span>

          {/* CENTER LINKS */}
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <span className="cursor-pointer" onClick={() => navigate("/")}>Home</span>
            <span className="cursor-pointer" onClick={() => navigate("/products")}>Shop</span>
          </div>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center space-x-4">

            {/* CART */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart size={24} className="text-gray-700 hover:text-blue-600" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {!isAuthenticated ? (
              <button
                className="hidden md:block bg-blue-600 text-white px-4 py-1.5 rounded-full"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            ) : (
              <button
                className="hidden md:block bg-red-500 text-white px-4 py-1.5 rounded-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            <FaUserCircle size={28} className="hidden md:block text-gray-700" />
          </div>

        </div>
      </div>
    </nav>
  );
}

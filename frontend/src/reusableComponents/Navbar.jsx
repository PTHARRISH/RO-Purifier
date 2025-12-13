import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4">
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
            <span
              onClick={() => navigate("/")}
              className={`cursor-pointer pb-1 ${isActive("/")}`}
            >
              Home
            </span>

            <span
              onClick={() => navigate("/products")}
              className={`cursor-pointer pb-1 ${isActive("/products")}`}
            >
              Shop
            </span>

            <span
              onClick={() => navigate("/about")}
              className={`cursor-pointer pb-1 ${isActive("/about")}`}
            >
              About
            </span>

            <span
              onClick={() => navigate("/contact")}
              className={`cursor-pointer pb-1 ${isActive("/contact")}`}
            >
              Contact
            </span>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-4">

            {/* CART */}
            <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {!isAuthenticated ? (
              <button
                onClick={() => navigate("/signup")}
                className="hidden md:block bg-blue-600 text-white px-4 py-1.5 rounded-full"
              >
                Sign Up
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden md:block bg-red-500 text-white px-4 py-1.5 rounded-full"
              >
                Logout
              </button>
            )}

            <FaUserCircle size={28} className="hidden md:block" />
          </div>
        </div>
      </div>
    </nav>
  );
}

import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetails from "./Pages/ProductsDetails";
import Cart from "./Pages/Cart";
import AboutUs from "./Pages/About";
import Contact from "./Pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        {/* NEW ROUTES */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

// src/Pages/LandingPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../reusableComponents/Navbar";
import Carousel from "../reusableComponents/CarouselSlider";
import ListCards from "../reusableComponents/ListCards";
import Footer from "../reusableComponents/Footer";
import ProductCard from "../reusableComponents/ProductCard";
import FeatureList from "../reusableComponents/FeaturesList";
import TechnicianCard from "../reusableComponents/TechnicianCard";
import BentoGrid from "../reusableComponents/BentoGrid";
import BannerCard from "../reusableComponents/BannerCard";
import { useAuth } from "../utils/auth"; // ✅ NEW AUTH HOOK

const LandingPage = () => {
  const { user, logout } = useAuth(); // ✅ Perfect auth integration
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ No more import errors!
  };

  const handleUserDashboard = () => {
    navigate("/products"); // User goes to products
  };

  const handleAdminDashboard = () => {
    navigate("/admin/dashboard"); // Admin direct access
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Enhanced Navbar with Auth Status */}
      {/* <Navbar 
        user={user}
        onLogout={handleLogout}
        onLogin={() => navigate("/login")}
        onSignup={() => navigate("/signup")}
        onProfile={() => navigate("/profile")}
        onUserDashboard={handleUserDashboard}
        onAdminDashboard={handleAdminDashboard}
      /> */}

      {/* Hero Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 sm:mb-16 lg:mb-20"
      >
        <Carousel />
      </motion.div>

      {/* Featured Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-black bg-clip-text text-transparent mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover premium products and expert technicians for all your tech needs
            </p>
          </motion.div>
          <ListCards />
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Best selling items with guaranteed quality
            </p>
          </motion.div>
          <ProductCard />
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureList />
        </div>
      </motion.section>

      {/* Technicians */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Top Skilled Technicians
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Certified experts ready to serve you
            </p>
          </motion.div>
          <TechnicianCard />
        </div>
      </motion.section>

      {/* Bento Grid */}
      <motion.section
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
      >
        <BentoGrid />
      </motion.section>

      {/* Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <BannerCard />
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
};

export default LandingPage;

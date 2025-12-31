import React from "react";
import { motion } from "framer-motion";
import Navbar from "../reusableComponents/Navbar";
import CarouselSlider from "../reusableComponents/CarouselSlider";
import ListCards from "../reusableComponents/ListCards";
import Footer from "../reusableComponents/Footer";
import ProductCard from "../reusableComponents/ProductCard";
import FeatureList from "../reusableComponents/FeaturesList";
import TechnicianCard from "../reusableComponents/TechnicianCard";
import BentoGrid from "../reusableComponents/BentoGrid";
import BannerCard from "../reusableComponents/BannerCard";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <CarouselSlider autoPlay={true}/>
      </motion.div>

      {/* Featured Categories */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Discover premium products and expert technicians for all your tech needs.
            </p>
          </motion.div>
          <ListCards />
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Best selling items with guaranteed quality
            </p>
          </motion.div>
          <ProductCard />
        </div>
      </motion.section>

      {/* Features */}
      <motion.section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="max-w-7xl mx-auto">
          <FeatureList />
        </div>
      </motion.section>

      {/* Technicians */}
      <motion.section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Top Skilled Technicians
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Certified experts ready to serve you
            </p>
          </motion.div>
          <TechnicianCard />
        </div>
      </motion.section>

      {/* Bento Grid */}
      <motion.section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
        <BentoGrid />
      </motion.section>

      {/* Banner */}
      <motion.section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
        <BannerCard />
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

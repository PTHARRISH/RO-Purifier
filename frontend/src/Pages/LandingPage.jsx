import React from "react";
import { motion } from "framer-motion";
import Navbar from "../reusableComponents/Navbar";
import Carousel from "../reusableComponents/CarouselSlider";
import ListCards from "../reusableComponents/ListCards";
import Footer from "../reusableComponents/Footer";
import ProductCard from "../reusableComponents/ProductCard";
import FeatureList from "../reusableComponents/FeaturesList";
import TechnicianCard from "../reusableComponents/TechnicianCard";
import BentoGrid from "../reusableComponents/BentoGrid";
import BannerCard from "../reusableComponents/BannerCard";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar  />

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 sm:mb-12"
      >
        <Carousel />
      </motion.div>

      <ListCards />

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 sm:mb-14"
          >
            Featured Products
          </motion.h2>
          <ProductCard /> {/* Now renders all featured products internally */}
        </div>
      </section>

      {/* Service Features */}
      <section className="bg-gray-50">
        <FeatureList />
      </section>

      {/* Technicians Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 sm:mb-14"
          >
            Our Top Skilled Technicians
          </motion.h2>
          <TechnicianCard /> {/* Now renders all technicians internally */}
        </div>
      </section>

      <BentoGrid />
      <BannerCard />
      <Footer />
    </div>
  );
};

export default LandingPage;

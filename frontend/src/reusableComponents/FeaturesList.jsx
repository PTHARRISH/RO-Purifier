import React from "react";
import { motion } from "framer-motion"; // ✅ Added missing import
import { FaNetworkWired, FaUndoAlt, FaCheckCircle, FaGift } from "react-icons/fa";

export default function FeatureList() {
  const serviceFeatures = [
    { icon: FaNetworkWired, name: "Wide Service Network" },
    { icon: FaUndoAlt, name: "Easy Return" },
    { icon: FaCheckCircle, name: "Trusted Brand" },
    { icon: FaGift, name: "Free 1 Year Warranty" },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {serviceFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="text-blue-500 text-4xl mb-4">
              <feature.icon />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {feature.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

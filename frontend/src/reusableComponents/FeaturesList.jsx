import React from "react";
import { motion } from "framer-motion";
import { FaNetworkWired, FaUndoAlt, FaCheckCircle, FaGift } from "react-icons/fa";

export default function FeatureList() {
  const serviceFeatures = [
    { icon: FaNetworkWired, name: "Wide Service Network" },
    { icon: FaUndoAlt, name: "Easy Return" },
    { icon: FaCheckCircle, name: "Trusted Brand" },
    { icon: FaGift, name: "Free 1 Year Warranty" },
  ];

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {serviceFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="
              bg-white rounded-2xl shadow-md
              p-6 flex flex-col items-center
              text-center
              hover:shadow-xl transition
            "
          >
            <div className="text-blue-600 text-3xl sm:text-4xl mb-3">
              <feature.icon />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {feature.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

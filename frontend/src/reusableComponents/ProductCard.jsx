import { motion } from "framer-motion";
import { FiEye, FiCheck, FiStar, FiCreditCard } from "react-icons/fi";
import { TbBasket } from "react-icons/tb";
import Button from "./Button";

export default function ProductCard() {
  const featuredProducts = [
    {
      id: 0,
      isPromo: true,
      brand: "Latest",
      name: "New Products",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
      features: ["Latest Arrivals", "Best Deals"],
    },
    {
      id: 1,
      brand: "Pureit",
      name: "Ro Enrich Glory RO+UV+UF Copper Water Purifier",
      price: 11999,
      originalPrice: 12599,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
      isNew: true,
      features: ["5 Year Free Service", "Free Delivery"],
      rating: 4.6,
      reviews: "98",
      emi: 2084,
    },
    {
      id: 2,
      brand: "Aquaguard",
      name: "Enhance RO+UV Water Purifier",
      price: 8999,
      originalPrice: 10999,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
      features: ["3 Year Warranty", "Free Installation"],
      rating: 4.4,
      reviews: "156",
      emi: 1673,
    },
    {
      id: 3,
      brand: "Kent",
      name: "Grand Plus RO Water Purifier",
      price: 14999,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
      isNew: true,
      features: ["10 Year Free Service", "Free Delivery"],
      rating: 4.8,
      reviews: "234",
      emi: 2499,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {featuredProducts.map((product, index) => (
        <SingleProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

function SingleProductCard({ product, index }) {
  if (!product) {
    return (
      <div className="w-full h-[28rem] flex items-center justify-center p-4 text-gray-500 text-xs bg-gray-50 rounded-2xl shadow-lg border">
        Product data missing
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="w-full h-[28rem] rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* PROMO CARD */}
      {product.isPromo ? (
        <div className="relative w-full h-full flex flex-col justify-between bg-blue-900 text-white">
          <div className="absolute inset-0">
            <img
              src={product.image}
              alt="Promo"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>

          <div className="relative z-10 p-4">
            <span className="bg-white/20 backdrop-blur-lg px-4 py-1.5 rounded-full text-xs font-bold border border-white/30 shadow">
              SPECIAL PROMOTION
            </span>
          </div>

          <div className="relative z-10 text-center px-6">
            <h2 className="text-xl font-extrabold leading-tight drop-shadow-lg">
              {product.promoTitle || "Exclusive New Arrivals"}
            </h2>
            <p className="text-sm text-gray-200 mt-2">
              {product.promoSubtitle || "Find the best new products curated just for you."}
            </p>
          </div>

          <div className="relative z-10 p-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-3 text-sm font-semibold bg-white text-blue-700 rounded-full shadow-lg border border-white hover:bg-gray-100"
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      ) : (
        /* NORMAL PRODUCT CARD */
        <>
          <div className="relative h-48 p-2 overflow-hidden rounded-t-2xl">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                NEW
              </span>
            )}
            {discount > 0 && (
              <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="flex-1 p-4 flex flex-col justify-between bg-white rounded-b-2xl">
            <div className="pb-1">
              <span className="px-4 py-1 rounded-full text-xs font-semibold inline-block bg-blue-50 text-blue-700">
                {product.brand}
              </span>
              <h3 className="font-bold text-sm leading-5 line-clamp-2 mt-1.5 text-gray-900">
                {product.name}
              </h3>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
            </div>

            <div>
              {product.features?.slice(0, 3).map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-gray-700 leading-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 + idx * 0.06 }}
                >
                  <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{feature}</span>
                </motion.div>
              ))}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent mt-1" />
            </div>

            <div className="py-1.5">
              <div className="flex justify-between items-end mb-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{product.price?.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {product.rating && (
                  <div className="flex items-center gap-0.5 text-xs font-bold bg-yellow-400 text-gray-900 px-2 py-1.5 rounded-lg shadow">
                    <FiStar className="w-3 h-3" /> {product.rating}
                  </div>
                )}
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            {product.emi && (
              <div className="py-1">
                <div className="px-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
                    <FiCreditCard className="w-2 h-2" />
                    No Cost EMI ₹{product.emi}/mo
                  </div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-2" />
              </div>
            )}

            <div className="pt-2">
              <div className="flex gap-2 items-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-300 text-emerald-700 text-sm py-2.5 rounded-full shadow hover:bg-emerald-100"
                >
                  <TbBasket className="w-4 h-4" />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  whileTap={{ scale: 0.92 }}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow border border-gray-200 flex items-center justify-center"
                >
                  <FiEye className="w-4 h-4 text-gray-700" />
                </motion.button>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

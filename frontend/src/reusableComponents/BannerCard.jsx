import { motion } from "framer-motion";

export default function BannerCard() {
  const bannerData = {
    title: "Exchange Your Old RO",
    subtitle:
      "Get instant value for your old purifier. Upgrade to a new model with advanced filtration and smart design.",
    ctaText: "Explore Exchange Offers",
    image:
      "https://images.unsplash.com/photo-1615484473812-66b5c0b8c63f?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="
        relative overflow-hidden rounded-3xl
        bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700
        shadow-2xl my-10
      "
    >
      {/* GRID WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        
        {/* CONTENT */}
        <div className="relative z-10 px-6 sm:px-8 lg:px-12 py-10 lg:py-16 text-white">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="
              text-2xl sm:text-3xl lg:text-4xl font-extrabold
              bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent
            "
          >
            {bannerData.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="
              mt-4 max-w-xl
              text-sm sm:text-base lg:text-lg
              text-white/90 leading-relaxed
            "
          >
            {bannerData.subtitle}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              mt-6 inline-flex items-center gap-3
              bg-white text-blue-700 font-semibold
              px-6 py-3 rounded-xl
              shadow-xl hover:bg-blue-50 transition
            "
          >
            {bannerData.ctaText}
            <span className="text-xl">→</span>
          </motion.button>
        </div>

        {/* IMAGE */}
        <div className="relative h-64 sm:h-72 lg:h-full">
          <img
            src={bannerData.image}
            alt="RO Purifier"
            className="absolute inset-0 w-full h-full object-cover opacity-20 lg:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/50" />
        </div>
      </div>

      {/* DECOR ELEMENTS */}
      <div className="absolute top-6 left-6 w-16 h-16 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/5 rounded-full blur-2xl animate-pulse" />
    </motion.section>
  );
}

import { motion } from "framer-motion";

export default function BannerCard() {
  const bannerData = {
    image: "https://images.unsplash.com/photo-1615484473812-66b5c0b8c63f?auto=format&fit=crop&w=1200&q=80",
    title: "Exchange Your Old RO",
    subtitle: "Get instant value for your old purifier. Upgrade to a new model with advanced filtration and smart design.",
    ctaText: "Explore Exchange Offers"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 text-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group w-full my-8"
    >
      {/* Background RO Purifier Image - Right Corner */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-15">
        <img 
          src="https://images.unsplash.com/photo-1615484473812-66b5c0b8c63f?auto=format&fit=crop&w=800&q=80" 
          alt="RO Purifier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40" />
      </div>

      {/* Content Section - Full Width */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl font-black mb-4 leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg"
          >
            {bannerData.title}
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-base mb-6 opacity-95 leading-relaxed max-w-2xl"
          >
            {bannerData.subtitle}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="group/cta relative bg-white/90 backdrop-blur-xl text-blue-700 px-6 py-2.5 md:px-8 md:py-3 rounded-xl font-semibold text-sm md:text-base shadow-xl border-2 border-white/50 hover:bg-white hover:text-blue-600 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {bannerData.ctaText}
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover/cta:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
          </motion.button>
        </div>
      </div>

      {/* RO Purifier Accent - Bottom Right Corner */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-4 right-4 w-20 h-20 md:w-24 md:h-24 opacity-20"
      >
        <img 
          src="https://images.unsplash.com/photo-1615484473812-66b5c0b8c63f?auto=format&fit=crop&w=300&q=80" 
          alt="RO Purifier Accent"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Decorative particles */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
      <div className="absolute bottom-12 right-12 w-12 h-12 bg-white/5 rounded-full blur-xl animate-pulse" />
    </motion.div>
  );
}

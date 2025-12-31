import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel({ autoPlay = true }) {
  // ✅ All three banners in one component
  const banners = [
    {
      title: "Find Verified RO Technicians Near You",
      subtitle: "Fast, Reliable & Affordable",
      description:
        "Book trusted experts to repair, install, or service your water purifier. Compare reviews, ratings, and service prices — all in one place.",
      buttons: [
        { text: "Book a Technician", action: "#book" },
        { text: "Explore Service Plans", action: "#plans" },
      ],
      image:
        "https://images.unsplash.com/photo-1581091870620-0b146eb55f90?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Reliable RO Services at Your Doorstep",
      subtitle: "Expert Technicians, Anytime",
      description:
        "Schedule your water purifier service with verified professionals near you.",
      buttons: [
        { text: "Book a Technician", action: "#book" },
        { text: "Explore Service Plans", action: "#plans" },
      ],
      image:
        "https://images.unsplash.com/photo-1581093448791-7a6e6a158330?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Affordable & Trusted RO Service",
      subtitle: "Compare, Book, Relax",
      description:
        "Check reviews, ratings, and prices before hiring the best RO technician.",
      buttons: [
        { text: "Book a Technician", action: "#book" },
        { text: "Explore Service Plans", action: "#plans" },
      ],
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const [current, setCurrent] = useState(0);

  /* ✅ Auto Play */
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, banners.length]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl h-[350px] sm:h-[400px] md:h-[450px] lg:h-[28rem]">
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <img
            src={banners[current].image}
            alt={banners[current].title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 sm:px-12 md:px-20 text-white">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
              {banners[current].title}
            </h2>
            <h3 className="text-lg sm:text-2xl font-semibold mb-3 drop-shadow-md">
              {banners[current].subtitle}
            </h3>
            <p className="text-sm sm:text-base md:text-lg mb-4 drop-shadow-sm">
              {banners[current].description}
            </p>
            <div className="flex flex-wrap gap-4">
              {banners[current].buttons.map((btn, idx) => (
                <motion.a
                  key={idx}
                  href={btn.action}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-3 rounded-full font-semibold text-sm sm:text-base transition ${
                    idx === 0
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-white hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  {btn.text}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* LEFT ARROW */}
      <button
        aria-label="Previous slide"
        onClick={() =>
          setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
        }
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg text-xl sm:text-2xl transition"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        aria-label="Next slide"
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg text-xl sm:text-2xl transition"
      >
        ›
      </button>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
              idx === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

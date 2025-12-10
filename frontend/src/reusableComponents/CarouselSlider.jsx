import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel({ autoPlay = true }) {
  const [current, setCurrent] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
  ];

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrent((current + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [current, autoPlay]);

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          className="w-full h-full object-cover"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: -100 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      
      <button
        onClick={() => setCurrent((current + images.length - 1) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
      >
        ›
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

import { motion } from "framer-motion";

export default function BentoGrid() {
  return (
    <section className="w-full overflow-x-hidden px-4 py-12">
      <div
        className="
          max-w-7xl mx-auto
          grid grid-cols-1
          md:grid-cols-3 md:grid-rows-2
          gap-4
        "
      >
        {/* Left Tall */}
        <Card
          className="md:row-span-2"
          title="Exchange Your Old Purifier"
          desc="Save up to 30% when you trade in your old RO system."
          img="https://i.ibb.co/0KBJyVf/water-purifier-1.jpg"
          btn="Exchange Now"
        />

        {/* Top Middle */}
        <Card
          title="Experience the Freshness"
          desc="This season, stay hydrated & save big!"
          img="https://i.ibb.co/xMf8sYb/water-drop-bg.jpg"
          btn="Grab Offers"
        />

        {/* Right Tall */}
        <Card
          className="md:row-span-2"
          title="Latest RO Purifiers"
          desc="Energy-efficient & stylish designs."
          img="https://i.ibb.co/6mSbMZC/ro-purifier-modern.jpg"
          btn="Explore"
        />

        {/* Bottom Middle */}
        <Card
          title="Book a Technician"
          desc="Certified experts at your doorstep."
          img="https://i.ibb.co/4R6HsxN/technician-ro.jpg"
          btn="Book Service"
        />
      </div>
    </section>
  );
}

function Card({ title, desc, img, btn, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        relative rounded-xl overflow-hidden
        text-white min-h-[260px]
        w-full max-w-full
        ${className}
      `}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full p-5 flex flex-col justify-end">
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        <p className="text-sm mt-2">{desc}</p>
        <button className="mt-4 bg-white text-black px-4 py-2 rounded-lg w-fit">
          {btn}
        </button>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";

export default function BentoGrid() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div
        className="
        grid h-full w-full 
        grid-cols-3 grid-rows-2 
        gap-4 p-4 rounded-lg
      "
      >
        {/* 1️⃣ LEFT TALL CARD - Exchange Offer */}
        <motion.div
          className="
            col-span-1 row-span-2 relative rounded-xl overflow-hidden text-white
          "
          style={{
            backgroundImage:
              "url('https://i.ibb.co/0KBJyVf/water-purifier-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative p-6 flex flex-col h-full justify-end">
            <h2 className="text-2xl font-bold">Exchange Your Old Purifier</h2>
            <p className="mt-2">
              Save up to 30% when you trade in your old RO system. Keep your
              home healthy with the latest models.
            </p>

            <button className="mt-4 bg-white text-black font-semibold px-4 py-2 rounded-lg w-fit">
              Exchange Now
            </button>
          </div>
        </motion.div>

        {/* 2️⃣ TOP MIDDLE - Freshness */}
        <motion.div
          className="
            col-span-1 row-span-1 relative rounded-xl overflow-hidden text-white
          "
          style={{
            backgroundImage:
              "url('https://i.ibb.co/xMf8sYb/water-drop-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative p-6">
            <h2 className="text-xl font-bold">Experience the Freshness</h2>
            <p className="mt-2">This Season, Stay Hydrated & Save Big!</p>

            <button className="mt-4 bg-white text-black font-semibold px-4 py-2 rounded-lg w-fit">
              Grab Offers
            </button>
          </div>
        </motion.div>

        {/* 3️⃣ RIGHT TALL - Latest RO Purifiers */}
        <motion.div
          className="
            col-span-1 row-span-2 relative rounded-xl overflow-hidden text-white
          "
          style={{
            backgroundImage:
              "url('https://i.ibb.co/6mSbMZC/ro-purifier-modern.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative p-6 flex flex-col h-full justify-end">
            <h2 className="text-2xl font-bold">
              Discover Our Latest RO Purifiers
            </h2>
            <p className="mt-2">
              Energy-efficient, compact, and stylish. Designed for modern homes.
            </p>

            <button className="mt-4 bg-white text-black font-semibold px-4 py-2 rounded-lg w-fit">
              Explore Exchange Offers
            </button>
          </div>
        </motion.div>

        {/* 4️⃣ BOTTOM MIDDLE - Service Booking */}
        <motion.div
          className="
            col-span-1 row-span-1 relative rounded-xl overflow-hidden text-white
          "
          style={{
            backgroundImage:
              "url('https://i.ibb.co/4R6HsxN/technician-ro.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative p-6">
            <h2 className="text-xl font-bold">Book a Technician</h2>
            <p className="mt-2">
              Certified technicians at your doorstep — fast & reliable service.
            </p>

            <button className="mt-4 bg-white text-black font-semibold px-4 py-2 rounded-lg w-fit">
              Book Service
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

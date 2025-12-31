import { motion } from "framer-motion";
import { FiEye, FiStar } from "react-icons/fi";
import { TbCalendarCheck } from "react-icons/tb";

export default function TechnicianCard() {
  const technicians = [
    {
      id: 1,
      name: "Rajesh Kumar",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      reviews: 220,
      experience: 6,
      location: "Chennai",
      services: ["Leakage Repair", "Filter Change"],
      startingPrice: 499,
      availableToday: true,
    },
    {
      id: 2,
      name: "Suresh Reddy",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.5,
      reviews: 180,
      experience: 5,
      location: "Bangalore",
      services: ["Pipe Replacement", "RO Servicing"],
      startingPrice: 599,
      availableToday: false,
    },
    {
      id: 3,
      name: "Anita Sharma",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4.7,
      reviews: 150,
      experience: 7,
      location: "Mumbai",
      services: ["Filter Change", "RO Installation"],
      startingPrice: 549,
      availableToday: true,
    },
    {
      id: 4,
      name: "Vikram Singh",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      rating: 4.6,
      reviews: 200,
      experience: 6,
      location: "Delhi",
      services: ["Leakage Repair", "Pipe Replacement"],
      startingPrice: 499,
      availableToday: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {technicians.map((tech, index) => (
          <SingleTechnicianCard
            key={tech.id}
            technician={tech}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function SingleTechnicianCard({ technician, index }) {
  if (!technician) {
    return (
      <div className="w-full min-h-[18rem] flex items-center justify-center p-4 text-gray-500 text-xs bg-gray-50 rounded-2xl shadow border">
        Technician data missing
      </div>
    );
  }

  return (
    <motion.div
      className="
        bg-white rounded-2xl shadow-md border border-gray-100
        flex flex-col overflow-hidden
        transition-all
      "
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* IMAGE */}
      <div className="relative h-36 sm:h-40 md:h-44 p-2">
        <img
          src={technician.image}
          alt={technician.name}
          className="w-full h-full object-cover rounded-xl"
        />

        {technician.availableToday && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
            <TbCalendarCheck className="w-3 h-3" />
            Available Today
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900">
            {technician.name}
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700 mt-1">
            <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded-full">
              <FiStar className="text-yellow-500 w-3 h-3" />
              {technician.rating}
              <span className="text-gray-500">({technician.reviews})</span>
            </div>
            <span className="text-gray-500">
              • {technician.experience} yrs
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            {technician.location}
          </p>
        </div>

        {/* SERVICES */}
        <div className="flex flex-wrap gap-1 mt-3">
          {technician.services?.map((service, idx) => (
            <span
              key={idx}
              className="
                text-xs px-2 py-0.5
                bg-blue-50 text-blue-700
                rounded-full
              "
            >
              {service}
            </span>
          ))}
        </div>

        {/* PRICE */}
        <div className="mt-3 text-sm font-semibold text-gray-900">
          ₹{technician.startingPrice} onwards
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="
              flex-1 flex items-center justify-center gap-2
              bg-gray-100 text-gray-700
              py-2 rounded-full text-sm
              hover:bg-gray-200 transition
            "
          >
            <FiEye className="w-4 h-4" />
            View
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="
              flex-1 flex items-center justify-center gap-2
              bg-green-500 text-white
              py-2 rounded-full text-sm
              hover:bg-green-600 transition
            "
          >
            Book
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

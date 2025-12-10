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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {technicians.map((tech, index) => (
        <SingleTechnicianCard key={tech.id} technician={tech} index={index} />
      ))}
    </div>
  );
}

function SingleTechnicianCard({ technician, index }) {
  if (!technician) {
    return (
      <div className="w-full h-72 flex items-center justify-center p-4 text-gray-500 text-xs bg-gray-50 rounded-2xl shadow-lg border">
        Technician data missing
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-72 rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
      initial={{ y: 15, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="relative h-40 p-2 overflow-hidden rounded-t-2xl">
        <img
          src={technician.image}
          alt={technician.name}
          className="w-full h-full object-cover rounded-xl"
        />
        {technician.availableToday && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
            <TbCalendarCheck className="w-3 h-3" /> Available Today
          </span>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between bg-white rounded-b-2xl">
        <div className="pb-2">
          <h3 className="font-bold text-sm leading-5 text-gray-900">{technician.name}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-700 mt-1">
            <div className="flex items-center gap-1">
              <FiStar className="w-3 h-3 text-yellow-400" />
              {technician.rating} ({technician.reviews})
            </div>
            <span>• {technician.experience} yrs</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{technician.location}</div>
        </div>

        <div className="flex flex-wrap gap-1 text-xs text-gray-700">
          {technician.services?.map((service, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="mt-2 text-sm font-semibold text-gray-900">
          ₹{technician.startingPrice} onwards
        </div>

        <div className="pt-2 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm py-2 rounded-full shadow hover:bg-gray-200"
          >
            <FiEye className="w-4 h-4" />
            View Profile
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white text-sm py-2 rounded-full shadow hover:bg-green-600"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import BannerCard from "../reusableComponents/BannerCard";
import Footer from "../reusableComponents/Footer";
import Navbar from "../reusableComponents/Navbar";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <BannerCard />

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Let&apos;s Talk With Us
          </h1>
          <p className="text-gray-600 max-w-xl">
            Questions, comments, or suggestions? Simply fill in the form and
            we’ll be in touch shortly.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT - Contact Info */}
          <div className="space-y-8 text-gray-700">

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FaMapMarkerAlt size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="mt-1">
                  1055 Arthur Ave Elk Groot, 67.<br />
                  New Palmas South Carolina.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FaEnvelope size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="mt-1">Contact@moralizer.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FaPhoneAlt size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="mt-1">+1 234 678 9108 99</p>
              </div>
            </div>

          </div>

          {/* RIGHT - Form */}
          <form className="bg-white p-8 shadow-lg rounded-2xl space-y-5">

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="bg-[#DFDFDF] border p-3 rounded-full outline-none focus:bg-[#EDFBFF] focus:border-blue-500 transition"
              />
              <input
                type="text"
                placeholder="Last Name*"
                className="bg-[#DFDFDF] border p-3 rounded-full outline-none focus:bg-[#EDFBFF] focus:border-blue-500 transition"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email*"
              className="bg-[#DFDFDF] border p-3 rounded-full outline-none focus:bg-[#EDFBFF] focus:border-blue-500 transition w-full"
              required
            />

            <input
              type="tel"
              placeholder="Phone Number*"
              className="bg-[#DFDFDF] border p-3 rounded-full outline-none focus:bg-[#EDFBFF] focus:border-blue-500 transition w-full"
              required
            />

            <textarea
              placeholder="Your message..."
              rows="5"
              className="bg-[#DFDFDF] border p-3 rounded-xl outline-none focus:bg-[#EDFBFF] focus:border-blue-500 transition w-full"
            />

            <button
              type="submit"
              className="bg-gradient-to-b from-[#48DAFF] to-[#0D5D9B] text-white px-6 py-3 rounded-full hover:opacity-90 transition w-full"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>

      <Footer />
    </div>
  );
}

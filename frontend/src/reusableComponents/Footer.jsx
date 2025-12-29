import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0D5D9B] text-white pt-16 pb-8 mt-20">

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">PureFlow RO</h3>
          <p className="text-gray-200 leading-relaxed text-sm">
            Pure Water. Pure Trust. <br />
            Delivering clean and safe drinking water for every home.
          </p>

          {/* Contact */}
          <div className="mt-6 space-y-3 text-sm text-gray-200">
            <div className="flex items-center gap-3">
              <FaEnvelope />
              <span>contact@moralizer.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt />
              <span>+1 234 678 9108 99</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-100/80">
            <li onClick={() => navigate("/")} className="cursor-pointer hover:text-white">Home</li>
            <li onClick={() => navigate("/products")} className="cursor-pointer hover:text-white">Shop</li>
            <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-white">About Us</li>
            <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-white">Contact</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-lg font-semibold mb-5">Information</h4>
          <ul className="space-y-3 text-sm text-gray-100/80">
            <li className="hover:text-white cursor-pointer">Shipping & Delivery</li>
            <li className="hover:text-white cursor-pointer">Returns & Refunds</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-5">Stay Connected</h4>
          <p className="text-gray-200 text-sm mb-5">
            Get updates, maintenance tips, and exclusive offers.
          </p>

          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-full text-gray-900 text-sm
                         outline-none focus:bg-[#EDFBFF] focus:ring-2 focus:ring-blue-300
                         placeholder:text-gray-600 transition"
            />
            <button
              type="submit"
              className="bg-gradient-to-b from-[#48DAFF] to-[#0D5D9B]
                         text-white px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <div className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer">
              <FaInstagram />
            </div>
            <div className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer">
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 mt-14">
        <hr className="border-gray-200/40" />
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-100/80 text-xs mt-4">
        © {new Date().getFullYear()} PureFlow RO — All Rights Reserved.
      </div>
    </footer>
  );
}

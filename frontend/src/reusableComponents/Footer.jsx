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
    <footer className="bg-[#0D5D9B] text-white pt-14 sm:pt-16 pb-8 mt-20">
      {/* MAIN GRID */}
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-10 lg:gap-12
        "
      >
        {/* COMPANY INFO */}
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold mb-4">PureFlow RO</h3>
          <p className="text-gray-200 leading-relaxed text-sm max-w-xs mx-auto sm:mx-0">
            Pure Water. Pure Trust.
            <br />
            Delivering clean and safe drinking water for every home.
          </p>

          {/* CONTACT */}
          <div className="mt-6 space-y-3 text-sm text-gray-200">
            <div className="flex justify-center sm:justify-start items-center gap-3">
              <FaEnvelope />
              <span>contact@moralizer.com</span>
            </div>
            <div className="flex justify-center sm:justify-start items-center gap-3">
              <FaPhoneAlt />
              <span>+1 234 678 9108 99</span>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-100/80">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-white transition"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/products")}
              className="cursor-pointer hover:text-white transition"
            >
              Shop
            </li>
            <li
              onClick={() => navigate("/about")}
              className="cursor-pointer hover:text-white transition"
            >
              About Us
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="cursor-pointer hover:text-white transition"
            >
              Contact
            </li>
          </ul>
        </div>

        {/* INFORMATION */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-5">Information</h4>
          <ul className="space-y-3 text-sm text-gray-100/80">
            <li className="hover:text-white cursor-pointer transition">
              Shipping & Delivery
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Returns & Refunds
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Terms & Conditions
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer transition">
              FAQs
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-5">Stay Connected</h4>
          <p className="text-gray-200 text-sm mb-5 max-w-sm mx-auto sm:mx-0">
            Get updates, maintenance tips, and exclusive offers.
          </p>

          {/* FORM */}
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full px-4 py-2.5
                rounded-full
                text-gray-900 text-sm
                outline-none
                focus:bg-[#EDFBFF]
                focus:ring-2 focus:ring-blue-300
                placeholder:text-gray-600
                transition
              "
            />
            <button
              type="submit"
              className="
                bg-gradient-to-b from-[#48DAFF] to-[#0D5D9B]
                text-white px-6 py-2.5
                rounded-full
                hover:opacity-90 transition
                whitespace-nowrap
              "
            >
              Subscribe
            </button>
          </form>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center sm:justify-start gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, idx) => (
              <div
                key={idx}
                className="
                  bg-white/20
                  p-3
                  rounded-full
                  hover:bg-white/30
                  cursor-pointer
                  transition
                "
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <hr className="border-gray-200/40" />
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-100/80 text-xs mt-4">
        © {new Date().getFullYear()} PureFlow RO — All Rights Reserved.
      </div>
    </footer>
  );
}

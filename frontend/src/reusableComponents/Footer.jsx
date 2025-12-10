export default function Footer() {
  return (
    <footer className="bg-[#0D5D9B] text-white pt-16 pb-8 mt-20">
      
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">RO Purifier</h3>
          <p className="text-gray-200 leading-relaxed">
            Pure Water. Pure Trust.  
            Delivering clean and safe drinking water for every home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-100/80">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Shop</a></li>
            <li><a href="#" className="hover:text-white transition">Find Technician</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-lg font-semibold mb-5">Information</h4>
          <ul className="space-y-3 text-sm text-gray-100/80">
            <li><a href="#" className="hover:text-white transition">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-white transition">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
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
              className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-600"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 px-6 py-2.5 rounded-lg text-sm font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full mt-14">
        <hr className="border-gray-200/40" />
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-100/80 text-xs mt-4">
        © {new Date().getFullYear()} PureFlow RO — All Rights Reserved.
      </div>

    </footer>
  );
}

// src/App.jsx
import React from "react";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingPage />
    </div>
  );
}

export default App;



// // src/App.jsx
// import { useState } from "react";
// import { motion } from "framer-motion";
// import Button from "./reusableComponents/Button";
// import Input from "./reusableComponents/Input";
// import ProductCard from "./reusableComponents/ProductCard";
// import Navbar from "./reusableComponents/Navbar";
// import Footer from "./reusableComponents/Footer";
// import BentoGrid from "./reusableComponents/BentoGrid";

// import FilterOptions from "./reusableComponents/FilterOption";
// import Modal from "./reusableComponents/ModalPopup";
// import Carousel from "./reusableComponents/CarouselSlider";
// import BannerCard from "./reusableComponents/BannerCard";
// import SearchBar from "./reusableComponents/Searchbar";

// const products = [
//   { id: 1, name: "iPhone 15 Pro", price: 999, image: "https://images.unsplash.com/photo-1690489874296-ea89dd0ba3f3?w=300", category: "Electronics" },
//   { id: 2, name: "MacBook Air", price: 1299, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300", category: "Electronics" },
//   { id: 3, name: "Nike Air Max", price: 129, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", category: "Clothing" },
//   { id: 4, name: "Adidas Ultraboost", price: 189, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300", category: "Clothing" },
//   { id: 5, name: "Coffee Maker", price: 79, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300", category: "Home" },
//   { id: 6, name: "Yoga Mat", price: 39, image: "https://images.unsplash.com/photo-1588854337236-7947b26e6a62?w=300", category: "Sports" }
// ];

// function App() {
//   const [cartCount, setCartCount] = useState(3);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState([]);
//   const [email, setEmail] = useState("");

//   const categories = ["Electronics", "Clothing", "Home", "Sports"];
//   const carouselImages = [
//     "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
//     "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
//     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200"
//   ];

//   const filteredProducts = products.filter(product => 
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (filters.length === 0 || filters.includes(product.category))
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <Navbar cartCount={cartCount} />
      
//       <main className="max-w-7xl mx-auto px-4 py-12">
//         {/* Hero Carousel */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
//           <Carousel images={carouselImages} />
//         </motion.div>

//         {/* Search + Filters Row */}
//         <div className="flex flex-col lg:flex-row gap-6 mb-12">
//           <SearchBar onSearch={setSearchTerm} />
//           <FilterOptions categories={categories} onFilterChange={setFilters} />
//         </div>

//         {/* Banner Cards */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           <BannerCard
//             title="Summer Sale 50% OFF"
//             subtitle="Limited time offer on all electronics"
//             ctaText="Shop Electronics"
//             image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
//             onClick={() => setFilters(["Electronics"])}
//           />
//           <BannerCard
//             title="Free Shipping"
//             subtitle="On orders over $50"
//             ctaText="Learn More"
//             image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
//             onClick={() => alert("Free shipping on orders over $50!")}
//           />
//           <BannerCard
//             title="New Arrivals"
//             subtitle="Check out latest products"
//             ctaText="Explore Now"
//             image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
//             onClick={() => setFilters([])}
//           />
//         </div>

//         {/* Featured Products */}
//         <section>
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </section>

//         {/* Newsletter Signup */}
//         <motion.section 
//           initial={{ opacity: 0 }} 
//           whileInView={{ opacity: 1 }} 
//           className="mt-20 p-8 bg-white rounded-2xl shadow-xl"
//         >
//           <h3 className="text-2xl font-bold text-center mb-6">Stay Updated</h3>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//             <Input
//               label=""
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Button size="lg" onClick={() => alert("Subscribed!")}>Subscribe</Button>
//           </div>
//         </motion.section>

//         {/* Bento Grid Demo */}
//         <section className="mt-20">
//           <h3 className="text-2xl font-bold mb-8">Dashboard Preview</h3>
//           <BentoGrid />
//         </section>

//         {/* Demo Modal Trigger */}
//         <div className="mt-12 text-center">
//           <Button 
//             size="lg" 
//             onClick={() => setIsModalOpen(true)}
//             className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
//           >
//             Quick Product View
//           </Button>
//         </div>
//       </main>

//       {/* Modal */}
//       <Modal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         title="iPhone 15 Pro - Quick View"
//       >
//         <div className="space-y-4">
//           <img src="https://images.unsplash.com/photo-1690489874296-ea89dd0ba3f3?w=400" alt="iPhone" className="w-full h-48 object-cover rounded-lg" />
//           <h3 className="text-xl font-bold">$999</h3>
//           <p className="text-gray-600">Latest iPhone with A17 Pro chip and titanium design.</p>
//           <div className="flex gap-3 pt-4">
//             <Button className="flex-1">Add to Cart</Button>
//             <Button variant="outline" className="flex-1">View Details</Button>
//           </div>
//         </div>
//       </Modal>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default App;


import React from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "../reusableComponents/Navbar";

const products = [
  {
    id: 1,
    tag: "New",
    brand: "Pureit",
    title: "Ro Enrich Glory RO+UV+UF Copper Water Purifier",
    features: ["5 Year Free Service", "Free Delivery", "2 Year Warranty"],
    price: 11999,
    oldPrice: 12599,
    discount: "20%",
    rating: 4.6,
    reviews: 98,
    emi: "No-cost EMI from ₹2,084/mo",
    image:
      "https://m.media-amazon.com/images/I/71X6ikD7nCL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    tag: "Discounted",
    brand: "Livpure",
    title: "Glo 7L RO+UV Water Purifier",
    features: ["Free Delivery", "1 Year Warranty"],
    price: 10999,
    oldPrice: 14000,
    discount: "22%",
    rating: 4.3,
    reviews: 89,
    emi: "No-cost EMI from ₹1,833/mo",
    image:
      "https://m.media-amazon.com/images/I/81w9IuT-3xL._AC_SL1500_.jpg",
  },
  {
    id: 3,
    brand: "Blue Star",
    tag: "Popular",
    title: "Majesty 8L RO+UV Water Purifier",
    features: ["Free Installation", "1 Year Warranty"],
    price: 16499,
    oldPrice: 18999,
    discount: "13%",
    rating: 4.7,
    reviews: 135,
    emi: "No-cost EMI from ₹2,750/mo",
    image:
      "https://m.media-amazon.com/images/I/61E97QvQ9lL._AC_SL1500_.jpg",
  },
  {
    id: 4,
    tag: "Best Seller",
    brand: "Aquaguard",
    title: "Select 7L RO+UV Water Purifier",
    features: ["2 Year Warranty", "Free Installation"],
    price: 15999,
    oldPrice: 17999,
    discount: "11%",
    rating: 4.8,
    reviews: 150,
    emi: "No-cost EMI from ₹2,666/mo",
    image:
      "https://m.media-amazon.com/images/I/61fCYlG6F1L._AC_SL1500_.jpg",
  },
  {
    id: 5,
    tag: "Eco-Friendly",
    brand: "Tata",
    title: "Swach 10L Water Purifier",
    features: ["1 Year Warranty", "Free Delivery"],
    price: 9999,
    oldPrice: 11500,
    discount: "13%",
    rating: 4.2,
    reviews: 70,
    emi: "No-cost EMI from ₹1,667/mo",
    image:
      "https://m.media-amazon.com/images/I/61tHnhdDyML._AC_SL1500_.jpg",
  },
  {
    id: 6,
    tag: "Best Seller",
    brand: "HUL",
    title: "Pureit Marvella 6L RO Water Purifier",
    features: ["3 Year Warranty", "Free Installation"],
    price: 12899,
    oldPrice: 14999,
    discount: "14%",
    rating: 4.4,
    reviews: 95,
    emi: "No-cost EMI from ₹2,149/mo",
    image:
      "https://m.media-amazon.com/images/I/71xo-YJoZJL._AC_SL1500_.jpg",
  },
  {
    id: 7,
    tag: "Hot Deal",
    brand: "Kent",
    title: "Grand Plus RO+UV+UF TDS Water Purifier",
    features: ["4 Year Warranty", "Free Filters"],
    price: 13499,
    oldPrice: 16999,
    discount: "21%",
    rating: 4.5,
    reviews: 122,
    emi: "No-cost EMI from ₹1,999/mo",
    image:
      "https://m.media-amazon.com/images/I/71fI1PZFxvL._AC_SL1500_.jpg",
  },
  {
    id: 8,
    tag: "Top Rated",
    brand: "AO Smith",
    title: "Z1 Instant Hot RO Water Purifier",
    features: ["Hot Water", "1 Year Warranty"],
    price: 17999,
    oldPrice: 20999,
    discount: "14%",
    rating: 4.9,
    reviews: 210,
    emi: "No-cost EMI from ₹3,333/mo",
    image:
      "https://m.media-amazon.com/images/I/71LOlSzb4GL._AC_SL1500_.jpg",
  }
];

const ProductsPage = () => {
  return (
    <div>
        <Navbar />
    

    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
      <p className="text-gray-600 mt-2 mb-8 max-w-2xl">
        Check out our newest offerings! Discover the latest innovations and
        features now at your fingertips.
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="shadow-lg rounded-xl overflow-hidden bg-white hover:scale-105 transition transform duration-200"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />

              {/* Tag Badge */}
              {product.tag && (
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Card Body */}
            <div className="p-4">
              <h3 className="text-sm text-gray-500 font-semibold">
                {product.brand}
              </h3>

              <h2 className="text-lg font-bold text-gray-900 mt-1">
                {product.title}
              </h2>

              {/* Features */}
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                {product.features.map((f, index) => (
                  <li key={index}>• {f}</li>
                ))}
              </ul>

              {/* Price Section */}
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-sm line-through text-gray-400">
                  ₹{product.oldPrice}
                </span>
                <span className="text-sm text-green-600 font-semibold">
                  {product.discount}
                </span>
              </div>

              {/* Rating */}
              <div className="mt-2 flex items-center space-x-1 text-yellow-500">
                <FaStar size={14} />
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-xs text-gray-600">({product.reviews})</span>
              </div>

              {/* EMI */}
              <p className="text-xs text-blue-600 mt-2">{product.emi}</p>

              {/* Buttons */}
              <div className="mt-4 flex justify-between">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-lg">
                  View More
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded-lg">
                  Add Cart
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>

    </div>
  );
};

export default ProductsPage;

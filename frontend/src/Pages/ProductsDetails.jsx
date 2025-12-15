import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../reusableComponents/Navbar";
import products from "../data/Productsdata";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center text-xl text-red-500 mt-20">
        Product Not Found
      </div>
    );
  }

  // If images array doesn’t exist → create one
  const fallbackImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const images = product.images || fallbackImages;

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT IMAGE SECTION */}
        <div>
          {/* MAIN BIG IMAGE */}
          <img
            src={mainImage}
            alt={product.name}
            className="w-full max-w-lg mx-auto rounded-xl shadow-lg border"
          />

          {/* SMALL THUMBNAILS */}
          <div className="grid grid-cols-4 gap-4 mt-5">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-full h-24 object-cover rounded-lg border cursor-pointer ${
                  mainImage === img ? "border-blue-600 border-2" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS SECTION */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="mt-3 flex items-center space-x-2 text-yellow-500">
            <FaStar />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-600 text-sm">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4 flex space-x-3 items-center">
            <span className="text-3xl font-semibold text-gray-900">
              ₹{product.price}
            </span>
            <span className="line-through text-gray-400">₹{product.mrp}</span>
            <span className="text-green-600 font-semibold">
              {product.discount}
            </span>
          </div>

          {/* EMI */}
          <p className="text-blue-600 text-sm mt-2">{product.emi}</p>

          {/* Offers */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Available Offers</h2>
            {product.offers?.map((offer, index) => (
              <p key={index} className="text-gray-700">• {offer}</p>
            ))}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Specifications</h2>
            <ul className="text-gray-700 space-y-1">
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                  </li>
                ))}
            </ul>
          </div>

          {/* Add to Cart Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add to Cart
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

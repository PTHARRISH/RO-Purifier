import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../reusableComponents/Navbar";
import { FaStar } from "react-icons/fa";
import products from "../data/Productsdata";
import { useCart } from "../context/CartContext";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Product List</h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">

          {products.map((product) => (
            <div
              key={product.id}
              className="shadow-lg bg-white rounded-xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <div className="p-4">
                <h3 className="text-gray-500 text-sm">{product.brand}</h3>
                <h2 className="font-bold">{product.name}</h2>

                <div className="mt-2 flex items-center text-yellow-500">
                  <FaStar />
                  <span className="ml-1 text-sm">{product.rating}</span>
                </div>

                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xl font-bold">₹{product.price}</span>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-gray-200 px-3 py-1 rounded"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View More
                  </button>

                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => addToCart(product)}
                  >
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

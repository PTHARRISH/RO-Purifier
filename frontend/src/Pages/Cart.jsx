// src/pages/Cart.jsx - WORKING WITH YOUR CartContext
import React from "react";
import Navbar from "../reusableComponents/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaRupeeSign } from "react-icons/fa";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart(); // ✅ clearCart works now
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.qty || 0),
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M3 3h2m4 0h12M9 3v2m6 0v2m0 0v2m0-2h2m-6 0h2M9 5h6a1 1 0 011 1v3a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1z" />
              </svg>
            </div>
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2"
              onClick={() => navigate("/products")}
            >
              🛒 Shop Now
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* LEFT SIDE – CART LIST */}
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
                >
                  {/* Product Image */}
                  <img
                    src={item.image || "https://via.placeholder.com/150?text=Product"}
                    className="w-32 h-32 object-cover rounded-xl shadow-md flex-shrink-0 hover:scale-105 transition-transform duration-200"
                    alt={item.name}
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">{item.name}</h2>
                    <p className="text-gray-600 text-lg mb-4 font-semibold flex items-center gap-1">
                      <FaRupeeSign />
                      {item.price?.toLocaleString() || "0"}
                    </p>

                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        className="w-12 h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => decreaseQty(item.id)}
                        disabled={(item.qty || 0) <= 1}
                      >
                        -
                      </button>

                      <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                        {item.qty || 1}
                      </span>

                      <button
                        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal of this product */}
                    <p className="text-xl font-bold text-blue-600 mb-4">
                      ₹{((item.qty || 0) * (item.price || 0)).toLocaleString()}
                    </p>

                    {/* Remove SINGLE Item */}
                    <button
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold hover:bg-red-50 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE – ORDER SUMMARY */}
            <div className="bg-white p-8 rounded-2xl shadow-lg h-fit sticky top-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Subtotal ({cart.length} items)</span>
                  <span className="font-bold text-xl">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 pb-2 border-t border-gray-200">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold text-lg">FREE</span>
                </div>
                <div className="flex justify-between pt-2 pb-2 border-t border-b border-gray-200">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-blue-600">
                    ₹{Math.round(subtotal * 1.18).toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all mb-4 flex items-center justify-center gap-2">
                <FaRupeeSign />
                Proceed to Checkout
              </button>

              {/* ✅ FIXED: WORKING Clear All Button */}
              <button
                onClick={() => {
                  if (window.confirm(`Clear all ${cart.length} items from cart?`)) {
                    clearCart();  // ✅ NOW WORKS PERFECTLY!
                  }
                }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <FaTrash className="w-5 h-5" />
                Clear All Cart ({cart.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

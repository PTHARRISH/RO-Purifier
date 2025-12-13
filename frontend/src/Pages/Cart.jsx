import React from "react";
import Navbar from "../reusableComponents/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>

            <button
              className="bg-blue-600 text-white px-6 py-2 rounded"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {/* LEFT SIDE – CART LIST */}
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-4 rounded-xl shadow-md"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    className="w-32 h-32 object-cover rounded-lg"
                    alt={item.name}
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-gray-600 text-sm">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        className="bg-gray-200 px-3 py-1 rounded"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>

                      <span className="text-lg font-semibold">{item.qty}</span>

                      <button
                        className="bg-gray-200 px-3 py-1 rounded"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal of this product */}
                    <p className="mt-2 font-semibold text-blue-600">
                      ₹{(item.qty * item.price).toLocaleString()}
                    </p>

                    {/* Remove Button */}
                    <button
                      className="text-red-500 mt-3 text-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE – ORDER SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4 text-gray-700">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

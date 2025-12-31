import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import {
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaRupeeSign,
  FaChartBar,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

/* -------------------- DATA -------------------- */

const ICON_COLORS = {
  indigo: "bg-indigo-600",
  emerald: "bg-emerald-600",
  purple: "bg-purple-600",
  orange: "bg-orange-600",
};

const stats = [
  { title: "Total Revenue", value: "₹2.45L", change: "+12.4%", trend: "up", icon: FaRupeeSign, color: "indigo" },
  { title: "Orders", value: "1,240", change: "+8.2%", trend: "up", icon: FaShoppingCart, color: "emerald" },
  { title: "Customers", value: "860", change: "+15.1%", trend: "up", icon: FaUsers, color: "purple" },
  { title: "Products", value: "320", change: "-2.3%", trend: "down", icon: FaBox, color: "orange" },
];

const recentOrders = [
  { id: "#ORD-1021", customer: "Rahul Kumar", amount: "₹4,500", status: "completed" },
  { id: "#ORD-1022", customer: "Sneha M.", amount: "₹2,200", status: "pending" },
  { id: "#ORD-1023", customer: "Amit Singh", amount: "₹6,800", status: "cancelled" },
];

/* -------------------- COMPONENT -------------------- */

const HomeAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const redirecting = useRef(false);

  /* 🔐 NO FLICKER LOGOUT FIX */
  useEffect(() => {
    if (!user && !redirecting.current) {
      redirecting.current = true;
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 px-4 sm:px-6 lg:px-10 py-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Monitor business performance and activities
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map(({ title, value, change, trend, icon: Icon, color }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-xl transition"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-500">
                  {title}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                  {value}
                </p>
                <span
                  className={`inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-xs font-bold ${
                    trend === "up"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                  {change}
                </span>
              </div>

              <div className={`p-4 rounded-xl ${ICON_COLORS[color]} text-white`}>
                <Icon size={22} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* REVENUE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2 bg-white rounded-2xl border p-6 shadow-sm hover:shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Revenue Analytics
              </h2>
              <p className="text-sm text-gray-600">Monthly overview</p>
            </div>
            <span className="w-fit px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl font-semibold text-sm">
              Live
            </span>
          </div>

          <div className="h-64 sm:h-80 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-dashed flex items-center justify-center">
            <div className="text-center">
              <FaChartBar className="mx-auto text-indigo-400 mb-4" size={56} />
              <p className="font-bold text-gray-700">Charts Coming Soon</p>
              <p className="text-gray-500 text-sm">Real-time analytics</p>
            </div>
          </div>
        </motion.div>

        {/* QUICK STATS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-xl"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
            Quick Stats
          </h3>

          {[
            { label: "Avg Order Value", value: "₹3,250", change: "+9.2%" },
            { label: "Conversion Rate", value: "4.2%", change: "+1.2%" },
            { label: "New Customers", value: "124", change: "+28%" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 mb-4 transition"
            >
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
              <div className="text-right">
                <p className="font-bold text-gray-900">{item.value}</p>
                <p className="text-xs font-semibold text-emerald-600">
                  {item.change}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ORDERS — MOBILE SAFE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border shadow-sm hover:shadow-xl overflow-hidden"
      >
        <div className="p-5 bg-gray-50 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Recent Orders
          </h2>
          <p className="text-sm text-gray-600">Latest transactions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">ORDER</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">CUSTOMER</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">AMOUNT</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-indigo-600">{o.id}</td>
                  <td className="px-6 py-4 font-semibold">{o.customer}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">{o.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        o.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : o.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeAdmin;

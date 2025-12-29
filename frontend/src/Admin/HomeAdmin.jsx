// src/Admin/HomeAdmin.jsx - 100% WORKING (react-icons/fa only)
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUsers, FaBox, FaRupeeSign, FaChartLine, FaChartBar, FaSignOutAlt, FaUser } from "react-icons/fa";

const stats = [
  { title: "Revenue", value: "₹2,45,000", change: "+12%", icon: FaRupeeSign, color: "emerald" },
  { title: "Orders", value: "1,240", change: "+8%", icon: FaShoppingCart, color: "blue" },
  { title: "Customers", value: "860", change: "+15%", icon: FaUsers, color: "purple" },
  { title: "Products", value: "320", icon: FaBox, color: "orange" },
];

const recentOrders = [
  { id: "#1021", customer: "Rahul K.", amount: "₹4,500", status: "Delivered", date: "2025-12-26" },
  { id: "#1022", customer: "Sneha M.", amount: "₹2,200", status: "Pending", date: "2025-12-27" },
  { id: "#1023", customer: "Amit S.", amount: "₹6,800", status: "Cancelled", date: "2025-12-27" },
];

const HomeAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back, <span className="font-semibold text-indigo-600">{user?.username}</span>!
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-xl">
            <FaUser size={16} />
            <span>{user?.username}</span>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full ml-2">ADMIN</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Logout"
          >
            <FaSignOutAlt size={20} />
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map(({ title, value, change, icon: Icon, color }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-white/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                {change && (
                  <p className="text-sm font-bold text-emerald-600 flex items-center gap-1 mt-2">
                    <FaChartLine className="w-4 h-4" />
                    {change} from last month
                  </p>
                )}
              </div>
              <div className={`p-4 rounded-2xl bg-gradient-to-br from-${color}-100 to-${color}-200 shadow-xl group-hover:scale-110 transition-all`}>
                <Icon size={28} className={`text-${color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Sales Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              Sales Overview
              <span className="px-3 py-1 bg-emerald-400 text-white text-sm font-bold rounded-full shadow-lg">Live Data</span>
            </h2>
            <FaChartBar className="w-8 h-8 text-indigo-500" />
          </div>
          <div className="h-96 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500 p-8">
              <FaChartBar className="w-20 h-20 mx-auto mb-6 opacity-30" />
              <p className="text-xl font-semibold mb-2">Interactive Sales Chart</p>
              <p className="text-lg">Real-time analytics coming soon</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Top Products</h2>
          <div className="space-y-4">
            {[
              { name: "RO Water Purifier", sales: "120", trend: "+24%" },
              { name: "UV Filter Kit", sales: "95", trend: "+18%" },
              { name: "Service AMC", sales: "70", trend: "+12%" },
              { name: "Installation", sales: "58", trend: "+9%" },
            ].map((product, index) => (
              <motion.div 
                key={product.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border"
              >
                <span className="font-semibold text-gray-900 truncate">{product.name}</span>
                <div className="text-right">
                  <p className="font-bold text-xl text-indigo-900">{product.sales}</p>
                  <p className="text-sm text-emerald-600 font-semibold">{product.trend}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent Orders</h2>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Order</th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Customer</th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Amount</th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Status</th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                  <td className="py-5 px-6 font-mono text-sm font-semibold text-indigo-900">{order.id}</td>
                  <td className="py-5 px-6">
                    <span className="font-semibold text-gray-900">{order.customer}</span>
                  </td>
                  <td className="py-5 px-6 font-mono font-bold text-xl text-emerald-700">{order.amount}</td>
                  <td className="py-5 px-6">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                      order.status === "Delivered" 
                        ? "bg-emerald-100 text-emerald-800" 
                        : order.status === "Pending" 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-sm font-medium text-gray-700">{order.date}</td>
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

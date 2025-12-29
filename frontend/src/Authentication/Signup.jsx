// src/Authentication/Signup.jsx - FULL PRODUCTION READY
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Input from "../reusableComponents/Input";
import { registerUser, registerAdmin } from "../Services/authService";

export default function Signup() {
  const [form, setForm] = useState({
    fullname: "", username: "", email: "", mobile: "", password: "", confirm_password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeringAs, setRegisteringAs] = useState("user");
  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm_password) newErrors.confirm_password = "Passwords don't match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    
    try {
      console.log(`🔍 REGISTER ${registeringAs.toUpperCase()}...`);
      
      if (registeringAs === "admin") {
        await registerAdmin(form);
      } else {
        await registerUser(form);
      }
      
      console.log(`✅ ${registeringAs.toUpperCase()} REGISTERED!`);
      navigate("/login", { 
        state: { 
          message: `${registeringAs.charAt(0).toUpperCase() + registeringAs.slice(1)} account created successfully! Please login.` 
        } 
      });
      
    } catch (error) {
      console.error("❌ REGISTRATION ERROR:", error.response?.data);
      setErrors({
        general: error.response?.data?.detail || 
                 error.response?.data?.error || 
                 "Registration failed. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 px-4 py-12">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/50">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 10a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zm8.586 6.414a2 2 0 11-2.828 2.828 2 2 0 012.828-2.828zM3.515 7.586a2 2 0 012.828 0" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
            Create Account
          </h1>
          <p className="text-xl text-gray-600">Join ShopEase today</p>
        </div>

        {/* Success Message */}
        {location.state?.message && (
          <div className="mb-8 p-5 bg-green-100 border border-green-200 text-green-800 rounded-2xl text-sm font-medium shadow-lg">
            {location.state.message}
          </div>
        )}

        {/* Role Toggle */}
        <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-1 mb-10 max-w-sm mx-auto shadow-inner">
          <button
            onClick={() => setRegisteringAs("user")}
            className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
              registeringAs === "user"
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25"
                : "text-gray-700 hover:bg-white/60 hover:shadow-md hover:text-emerald-700"
            }`}
          >
            👤 User Account
          </button>
          <button
            onClick={() => setRegisteringAs("admin")}
            className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
              registeringAs === "admin"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-700 hover:bg-white/60 hover:shadow-md hover:text-blue-700"
            }`}
          >
            🛠️ Admin Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="fullname"
            placeholder="John Doe"
            value={form.fullname}
            onChange={handleInputChange}
            error={errors.fullname}
            disabled={isSubmitting}
            required
          />
          <Input
            label="Username"
            name="username"
            placeholder="johndoe123"
            value={form.username}
            onChange={handleInputChange}
            error={errors.username}
            disabled={isSubmitting}
            required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleInputChange}
            error={errors.email}
            disabled={isSubmitting}
            required
          />
          <Input
            label="Mobile Number"
            name="mobile"
            type="tel"
            placeholder="9876543210"
            value={form.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
            disabled={isSubmitting}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleInputChange}
            error={errors.password}
            disabled={isSubmitting}
            required
          />
          <Input
            label="Confirm Password"
            name="confirm_password"
            type="password"
            placeholder="••••••••"
            value={form.confirm_password}
            onChange={handleInputChange}
            error={errors.confirm_password}
            disabled={isSubmitting}
            required
          />

          {/* Error Message */}
          {errors.general && (
            <div className="md:col-span-2 p-5 bg-red-100 border-2 border-red-400 text-red-800 rounded-2xl shadow-lg animate-pulse">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{errors.general}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex-1 py-5 px-10 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 transform hover:scale-[1.02]
                ${isSubmitting
                  ? "bg-gray-400 cursor-not-allowed opacity-60"
                  : `bg-gradient-to-r from-${registeringAs === 'user' ? 'emerald-500 green-600' : 'blue-500 indigo-600'} 
                     hover:from-${registeringAs === 'user' ? 'emerald-600 green-700' : 'blue-600 indigo-700'} 
                     hover:shadow-2xl hover:shadow-${registeringAs === 'user' ? 'emerald-500/25' : 'blue-500/25'} 
                     hover:-translate-y-1 text-white`
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-7 h-7 border-3 border-white/80 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Create {registeringAs.charAt(0).toUpperCase() + registeringAs.slice(1)} Account</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center space-y-3">
          <p className="text-lg font-semibold text-gray-700">
            Already have an account? 
            <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline ml-1 transition-all">
              Sign in now →
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

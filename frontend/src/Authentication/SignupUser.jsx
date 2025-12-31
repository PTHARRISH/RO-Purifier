// src/Authentication/SignupUser.jsx
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Input from "../reusableComponents/Input";
import { registerUser } from "../Services/authService";

export default function SignupUser() {
  const [form, setForm] = useState({
    fullname: "", username: "", email: "", mobile: "", password: "", confirm_password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      // ✅ User registration with role: "user"
      await registerUser({
        ...form,
        role: "user"
      });
      navigate("/login", { 
        state: { 
          message: "User account created successfully! Please login to continue shopping." 
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
      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 10a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zm8.586 6.414a2 2 0 11-2.828 2.828 2 2 0 012.828-2.828zM3.515 7.586a2 2 0 012.828 0" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
            Join ShopEase
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">Create your shopper account</p>
        </div>

        {/* Success Message */}
        {location.state?.message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-2xl text-sm sm:text-base shadow-md">
            {location.state.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" name="fullname" placeholder="John Doe" value={form.fullname} onChange={handleInputChange} error={errors.fullname} disabled={isSubmitting} />
            <Input label="Username" name="username" placeholder="johndoe123" value={form.username} onChange={handleInputChange} error={errors.username} disabled={isSubmitting} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleInputChange} error={errors.email} disabled={isSubmitting} />
            <Input label="Mobile" name="mobile" type="tel" placeholder="9876543210" value={form.mobile} onChange={handleInputChange} error={errors.mobile} disabled={isSubmitting} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleInputChange} error={errors.password} disabled={isSubmitting} />
            <Input label="Confirm Password" name="confirm_password" type="password" placeholder="••••••••" value={form.confirm_password} onChange={handleInputChange} error={errors.confirm_password} disabled={isSubmitting} />
          </div>

          {errors.general && (
            <div className="p-4 bg-red-100 border-2 border-red-400 text-red-800 rounded-2xl text-sm sm:text-base animate-pulse">
              {errors.general}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed opacity-60" 
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
            }`}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/80 border-t-white rounded-full animate-spin" />
            ) : (
              "Create User Account"
            )}
          </button>
        </form>

        {/* Footer */}
<div className="mt-8 pt-6 border-t border-gray-200 text-center">
  <p className="text-sm sm:text-base text-gray-700 font-semibold">
    Already have an account?{" "}
    <Link
      to="/login"
      className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-all"
    >
      Sign in →
    </Link>
  </p>
</div>

      </div>
    </div>
  );
}

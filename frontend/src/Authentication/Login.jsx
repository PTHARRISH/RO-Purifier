// src/Authentication/Login.jsx - FULL WORKING CODE
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Input from "../reusableComponents/Input";
import { loginUser } from "../Services/authService";
import { useAuth } from "../utils/auth";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  // ✅ AUTO REDIRECT if already logged in
  useEffect(() => {
    if (user) {
      console.log("🔄 AUTO REDIRECT - Already logged in:", user.id, user.role);
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!form.identifier.trim() || !form.password.trim()) {
      setErrors({ general: "Please fill all fields" });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("🔍 LOGIN API CALL...");
      const response = await loginUser(form);
      console.log("🔍 LOGIN RESPONSE:", response.data);
      
      const token = response.data.tokens.access;
      
      // ✅ STORE BACKEND ROLE + USER INFO (CRITICAL!)
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('fullname', response.data.fullname);
      
      console.log("💾 STORED ROLE:", response.data.role);
      
      // ✅ Trigger AuthProvider
      login(token);
      
      // ✅ Wait for state update then redirect
      setTimeout(() => {
        console.log("✅ LOGIN COMPLETE - Redirecting...");
        navigate("/", { replace: true });
      }, 100);
      
    } catch (error) {
      console.error("❌ LOGIN ERROR:", error.response?.data);
      setErrors({ 
        general: error.response?.data?.error || 
                 error.response?.data?.detail || 
                 "Login failed. Please try again."
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">Sign in to your account</p>
        </div>

        {/* Success Message */}
        {location.state?.message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-2xl text-sm font-medium">
            {location.state.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email / Username / Phone"
            name="identifier"
            type="text"
            placeholder="Enter your email, username or phone"
            value={form.identifier}
            onChange={handleInputChange}
            error={errors.identifier}
            disabled={isSubmitting}
            required
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleInputChange}
            error={errors.password}
            disabled={isSubmitting}
            required
          />
          
          {/* Error Message */}
          {errors.general && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-2xl text-sm animate-pulse">
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !form.identifier.trim() || !form.password.trim()}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transition-all duration-200 group ${
              isSubmitting || !form.identifier.trim() || !form.password.trim()
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 text-white"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-2 border-white/80 border-t-white rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account? 
            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline ml-1 transition-all">
              Sign up here
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            Forgot password? 
            <Link to="/forgot-password" className="text-blue-600 hover:underline font-semibold">
              Reset now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

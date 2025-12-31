import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../Services/authService";
import { useAuth } from "../utils/auth";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  // Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin/home" : "/", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);
      login(res.data.tokens.access);

      navigate(
        res.data.role === "admin" ? "/admin/home" : "/",
        { replace: true }
      );
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      
      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

        {/* LOGO / TITLE */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            S
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Sign in to ShopEase
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, please login
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {location.state?.message && (
          <div className="mb-4 rounded-lg bg-green-100 text-green-800 px-4 py-3 text-sm">
            {location.state.message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email / Username
            </label>
            <input
              type="text"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition-all ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-sm text-slate-600">
          Don’t have an account?
          <Link
            to="/signup/user"
            className="ml-1 font-semibold text-indigo-600 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

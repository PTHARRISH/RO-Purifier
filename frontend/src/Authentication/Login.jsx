// Login.jsx
import React, { useState } from "react";
import Input from "../reusableComponents/Input";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Services/authService";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.identifier) newErrors.identifier = "Email or Username required";
    if (!form.password) newErrors.password = "Password required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.access_token);
      navigate("/products");
    } catch (err) {
      console.error(err.response);
      alert(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="space-y-4 max-w-md w-full p-6 bg-white shadow rounded">
        <Input label="Email or Username" value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} placeholder="Enter email or username" error={errors.identifier} />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter password" error={errors.password} />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>

        <p className="text-center text-sm">
          Don’t have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

// Signup.jsx
import React, { useState } from "react";
import Input from "../reusableComponents/Input";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../Services/authService";

export default function Signup() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSignup = async (e) => {
    e.preventDefault();

    // Frontend validation
    let newErrors = {};
    if (!form.fullname) newErrors.fullname = "Full name is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirm_password) newErrors.confirm_password = "Confirm password is required";
    if (form.password !== form.confirm_password) newErrors.confirm_password = "Passwords do not match";
    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    const payload = {
      fullname: form.fullname,
      username: form.username,
      email: form.email,
      mobile: form.mobile,
      password: form.password,
      confirm_password: form.confirm_password,
    };

    try {
      await registerUser(form.role, payload);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err.response);
      alert(err.response?.data?.detail || err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSignup} className="space-y-4 max-w-md w-full p-6 bg-white shadow rounded">
        <Input label="Full Name" value={form.fullname} onChange={(e) => handleChange("fullname", e.target.value)} placeholder="Enter full name" error={errors.fullname} />
        <Input label="Username" value={form.username} onChange={(e) => handleChange("username", e.target.value)} placeholder="Enter username" error={errors.username} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="Enter email" error={errors.email} />
        <Input label="Mobile" value={form.mobile} onChange={(e) => handleChange("mobile", e.target.value)} placeholder="Enter mobile number" error={errors.mobile} />
        <Input label="Password" type="password" value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="Enter password" error={errors.password} />
        <Input label="Confirm Password" type="password" value={form.confirm_password} onChange={(e) => handleChange("confirm_password", e.target.value)} placeholder="Confirm password" error={errors.confirm_password} />

        <select className="w-full border p-2 rounded" value={form.role} onChange={(e) => handleChange("role", e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="technician">Technician</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}

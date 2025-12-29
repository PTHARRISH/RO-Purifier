import { useState } from "react";
import { getUserFromToken } from "../utils/Jwt";
import axiosInstance from "../Services/axiosInstance";

export default function Profile() {
  const user = getUserFromToken();

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put("/profile/update/", form);
      alert("Profile updated successfully");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-1">My Profile</h2>
        <p className="text-sm text-gray-500 mb-6">
          Update your account information
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Username"
          />

          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Email"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

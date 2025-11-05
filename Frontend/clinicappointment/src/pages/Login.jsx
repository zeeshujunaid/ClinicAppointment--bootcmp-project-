import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 overflow-hidden">
      <div className="w-[90%] sm:w-[400px] bg-white shadow-2xl rounded-3xl p-10 border border-blue-100">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
              alt="Clinic Logo"
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700">
            Clinic Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Access your dashboard securely
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div className="text-right">
            <a
              href="/dashboard"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

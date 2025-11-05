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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-200 via-white to-red-300">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl p-10 border border-red-100">
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-8">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-red-400 outline-none transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-red-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-red-500 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}


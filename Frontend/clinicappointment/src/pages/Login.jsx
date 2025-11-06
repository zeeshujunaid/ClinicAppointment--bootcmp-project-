import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 ye import zaroor karna
import baseurl from "../service/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 hook initialize karo

  const handleLogin = async (e) => {
    e.preventDefault(); // 👈 form reload na ho
    if (!email || !password) {
      console.log("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log("Login failed =>", data.message);
        return;
      }

      console.log("Login successful ✅", data.token);
      localStorage.setItem("token", data.token);

      // 👇 Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 overflow-hidden">
      <div className="w-[90%] sm:w-[400px] bg-white shadow-2xl rounded-3xl p-10 border border-blue-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img
              src="https://img.freepik.com/premium-vector/professional-medical-logo-design-modern-healthcare-clinic-hospital-logo-template_1290800-258.jpg"
              alt="Clinic Logo"
              className="w-25 h-25"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700">
            Clinic Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">Login Securely</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div className="text-right">
            <a
              href="#"
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

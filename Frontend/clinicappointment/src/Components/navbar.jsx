import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Clinic Logo"
            className="w-8 h-8"
          />
          <h1 className="text-lg md:text-xl font-bold text-blue-700">
            ClinicCare
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <a href="/dashboard" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="/appointment" className="hover:text-blue-600 transition">
            Appointments
          </a>
          <a href="/doctors" className="hover:text-blue-600 transition">
            Doctors
          </a>
          <a href="/profile" className="hover:text-blue-600 transition">
            Profile
          </a>
          <div className="mt-auto">
            <button
              className="flex items-center space-x-3 hover:bg-green-500 p-2 rounded-lg transition-all w-full"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-blue-700 text-2xl focus:outline-none"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col items-center bg-white py-4 border-t border-gray-200 shadow-md md:hidden">
          <a
            href="/"
            className="py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Home
          </a>
          <a
            href="/appointments"
            className="py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Appointments
          </a>
          <a
            href="/doctors"
            className="py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Doctors
          </a>
          <a
            href="/profile"
            className="py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Profile
          </a>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Clinic Logo"
            className="w-8 h-8"
          />
          <h1 className="text-lg md:text-xl font-bold text-blue-700">
            ClinicCare
          </h1>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <a href="/" className="hover:text-blue-600 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/appointments" className="hover:text-blue-600 transition">
              Appointments
            </a>
          </li>
          <li>
            <a href="/doctors" className="hover:text-blue-600 transition">
              Doctors
            </a>
          </li>
          <li>
            <a href="/profile" className="hover:text-blue-600 transition">
              Profile
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-blue-700 text-2xl focus:outline-none"
        >
          {/* {open ? <FaTimes /> : <FaBars />} */}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <ul className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium">
            <li>
              <a
                href="/"
                className="hover:text-blue-600 transition"
                onClick={() => setOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/appointments"
                className="hover:text-blue-600 transition"
                onClick={() => setOpen(false)}
              >
                Appointments
              </a>
            </li>
            <li>
              <a
                href="/doctors"
                className="hover:text-blue-600 transition"
                onClick={() => setOpen(false)}
              >
                Doctors
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="hover:text-blue-600 transition"
                onClick={() => setOpen(false)}
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

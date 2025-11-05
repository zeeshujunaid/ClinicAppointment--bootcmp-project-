import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    profileImg: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profileImg: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-4 border border-blue-100">
        {/* Header */}
        <div className="text-center mb-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Clinic Logo"
            className="w-12 h-12 mx-auto mb-1"
          />
          <h2 className="text-2xl font-bold text-blue-700">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm">
            Join our clinic and manage appointments easily
          </p>
        </div>

        {/* Profile Image Picker (Clickable Circle Only) */}
        <div className="flex flex-col items-center mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>

          {/* Clickable Circle */}
          <label
            htmlFor="profileImgInput"
            className="cursor-pointer relative group"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 text-xs group-hover:border-blue-400 transition-all duration-300">
                Upload
              </div>
            )}

            {/* Small overlay hint on hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </label>

          {/* Hidden File Input */}
          <input
            id="profileImgInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+92 300 1234567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="25"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md text-sm transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-xs mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

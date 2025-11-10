import React, { useState } from "react"; 
import baseurl from "../service/config";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [fullname,setFullname] = useState("");
  const [age, setAge] = useState("");
  const [gender,setGender]=useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Clinicpics");
    formData.append("cloud_name", "dudx3of1n");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dudx3of1n/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImage(data.secure_url);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handelSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !phone || !age || !fullname || !gender) {
      console.log("plz fill all required field");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number!"
      );
      return;
    }

    if (!image) {
      alert("Plz upload an image!");
      return;
    }
    try {
      const response = await fetch(`${baseurl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          fullname,
          age,
          gender,
          phone,
          image,
        }),
      });

      const resdata = await response.json();
      console.log(resdata);
      console.log(resdata.token);

      if (!response.ok) {
        console.log("signup failed =>", resdata.message);
        return;
      }

      localStorage.setItem("token", resdata.token);
      console.log("signup successful");

      navigate("/");
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-4 border border-blue-100">
        <div className="text-center mb-2">
          <img
            src="https://img.freepik.com/premium-vector/professional-medical-logo-design-modern-healthcare-clinic-hospital-logo-template_1290800-258.jpg"
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

        <div className="flex flex-col items-center mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>

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

            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </label>

          <input
            id="profileImgInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handelSignup}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 300 1234567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
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

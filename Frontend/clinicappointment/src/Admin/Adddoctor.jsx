import { useState, useContext } from "react";
import Sidebar from "../Components/sidebar";
import { UserContext } from "../context/Authcontext";
import baseurl from "../service/config";

export default function AddDoctor() {
  const [role, setRole] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const { user } = useContext(UserContext);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

  const validateForm = () => {
    if (!role) return "Please select a role.";
    if (!fullname || !email || !password || !gender)
      return "Full name, email, gender and password are required.";

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

    if (!image) return "Please upload a profile picture.";

    if (role === "doctor") {
      if (!specialization || !experience || !fees || !phone)
        return "Doctor details missing: Please fill specialization, experience, phone, and fees.";
    }

    if (role === "staff") {
      if (!department || !shift)
        return "Staff details missing: Please fill department and shift.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = user?._id || user?.id;

      const response = await fetch(`${baseurl}/api/auth/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname,
          image,
          email,
          password,
          role,
          phone,
          specialization,
          experience,
          gender,
          fees,
          department,
          shift,
          image,
          createdBy: userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`${role} added successfully!`);
        setFullname("");
        setEmail("");
        setPhone("");
        setPassword("");
        setSpecialization("");
        setExperience("");
        setFees("");
        setDepartment("");
        setShift("");
        setRole("");
        setGender("");
        setImage("");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-10">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64 flex justify-center items-center p-8">
        <form
          className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Add {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
          </h2>

          <div className="flex flex-col items-center mb-4">
            {image ? (
              <img
                src={image}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover mb-2 border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <label className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg cursor-pointer text-sm">
              {uploading ? "Uploading..." : "Upload Picture"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Role --</option>
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Full Name</label>
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Doctor Phone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="0876452939892"
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

          <div className="mb-3">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter password"
            />
          </div>

          {role === "doctor" && (
            <>
              <div className="mb-3">
                <label className="block font-medium mb-1">Specialization</label>
                <input
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g. Cardiologist"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium mb-1">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g. 5"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium mb-1">
                  Consultation Fee
                </label>
                <input
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g. 2000"
                />
              </div>
            </>
          )}

          {role === "staff" && (
            <>
              <div className="mb-3">
                <label className="block font-medium mb-1">Department</label>
                <input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g. Reception / Billing / Ward"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium mb-1">Shift</label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">-- Select Shift --</option>
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

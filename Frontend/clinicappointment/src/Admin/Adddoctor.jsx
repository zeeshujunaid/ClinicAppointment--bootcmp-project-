import { useState } from "react";
import Sidebar from "../Components/sidebar";

export default function AddDoctor() {
  const [role, setRole] = useState(""); // doctor ya staff
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    fees: "",
    department: "",
    shift: "",
  });

  // input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* ✅ Main Content (Form Section) */}
      <div className="flex-1 ml-64 flex justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Add {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
          </h2>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Select Role</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Role --</option>
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="mb-3">
            <label className="block font-medium mb-1">Full Name</label>
            <input
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter password"
            />
          </div>

          {/* Doctor Fields */}
          {role === "doctor" && (
            <>
              <div className="mb-3">
                <label className="block font-medium mb-1">Specialization</label>
                <input
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
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
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
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
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g. 2000"
                />
              </div>
            </>
          )}

          {/* Staff Fields */}
          {role === "staff" && (
            <>
              <div className="mb-3">
                <label className="block font-medium mb-1">Department</label>
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g. Reception / Billing / Ward"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium mb-1">Shift</label>
                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";

export default function Createroomschedule() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    roomNumber: "",
    date: "",
    startTime: "",
    slotDuration: 60, // default duration in minutes
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseurl}/api/auth/doctor`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setDoctors(data.users || data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const [hours, minutes] = formData.startTime.split(":").map(Number);
      const dateObj = new Date(formData.date);
      dateObj.setHours(hours, minutes, 0, 0);

      if (isNaN(dateObj.getTime())) {
        setMessage("❌ Invalid date or time");
        setLoading(false);
        return;
      }

      const formattedData = {
        doctorId: formData.doctorId,
        roomNumber: formData.roomNumber,
        date: formData.date,
        startTime: formData.startTime,
        slotDuration: Number(formData.slotDuration),
      };

      const res = await fetch(`${baseurl}/api/room/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create room");

      setMessage("✅ Room Schedule Created Successfully!");
      setFormData({
        doctorId: "",
        roomNumber: "",
        date: "",
        startTime: "",
        slotDuration: 60,
      });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100">
        <Sidebar />
      </div>

      <div className="w-4/5 p-8 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Create Room Schedule
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 max-w-lg mx-auto space-y-5"
        >
          {/* Doctor Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Doctor
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.fullname} ({doc.specialization})
                </option>
              ))}
            </select>
          </div>

          {/* Room Number Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Room Number
            </label>
            <select
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">-- Select Room --</option>
              {[1, 2, 3, 4].map((r) => (
                <option key={r} value={r}>
                  Room {r}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Slot Duration Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Slot Duration (minutes)
            </label>
            <select
              name="slotDuration"
              value={formData.slotDuration}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              {[...Array(9)].map((_, i) => {
                const val = (i + 1) * 10; // 10,20,...,90
                return (
                  <option key={val} value={val}>
                    {val} min
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Creating..." : "Create Schedule"}
          </button>

          {message && (
            <p
              className={`text-center mt-3 font-semibold ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import baseurl from "../service/config";
import Navbar from "../components/Navbar";

export default function Getdoctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    bloodGroup: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Login first");

    try {
      const res = await fetch(`${baseurl}/api/appointment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: selectedDoctor._id,
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error booking appointment");
        return;
      }

      alert("Appointment booked successfully!");
      setShowModal(false);
      setForm({
        age: "",
        bloodGroup: "",
        address: "",
        phone: "",
        medicalHistory: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
    setForm({
      bloodGroup: "",
      address: "",
    });
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseurl}/api/auth/doctor`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const doc = await response.json();

        if (!response.ok) {
          console.log("Fetch failed =>", doc.message);
          setDoctors([]);
          return;
        }

        setDoctors(doc);
      } catch (error) {
        console.log("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Clinic Timing Info */}
      <div className="mt-16 bg-gradient-to-r from-blue-100 to-blue-200 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 sm:mb-0 flex items-center gap-2">
            <i className="fas fa-clock text-blue-700"></i>
            Clinic Opening Hours
          </h2>
          <p className="text-gray-800 text-base sm:text-lg text-center sm:text-left font-medium">
            Monday - Friday:{" "}
            <span className="font-semibold">9:00 AM - 6:00 PM</span> |
            Saturday/sunday:Closed
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Doctors
        </h1>

        {/* Loading / No doctors */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            Loading doctors...
          </p>
        ) : !doctors.length ? (
          <p className="text-center text-gray-500 text-lg">No doctors found</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-72 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Profile Image */}
                <img
                  src={doc.profileImgurl || "https://via.placeholder.com/150"}
                  alt={doc.fullname}
                  className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-400 shadow-md"
                />

                {/* Name */}
                <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                  {doc.fullname}
                </h2>

                {/* Specialization */}
                <span className="text-blue-700 text-sm mb-3 px-3 py-1 bg-blue-100 rounded-full shadow-sm">
                  {doc.specialization}
                </span>

                {/* Info */}
                <div className="w-full text-gray-700 text-sm space-y-2 mb-5">
                  <p className="flex items-center gap-2">
                    <i className="fas fa-briefcase text-blue-600"></i>
                    <strong>Experience:</strong> {doc.experience} yrs
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-dollar-sign text-blue-600"></i>
                    <strong>Fees:</strong> ${doc.fees}
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-phone text-blue-600"></i>
                    {doc.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-calendar text-blue-600"></i>
                    Joined: {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleBookClick(doc)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-300"
                >
                  <i className="fas fa-calendar-check mr-2"></i>Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
        {showModal && selectedDoctor && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 sm:p-8 w-11/12 sm:w-96 shadow-xl relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                onClick={closeModal}
              >
                ✖
              </button>

              {/* Doctor Info */}
              <div className="mb-5 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedDoctor.fullname}
                </h2>
                <p className="text-blue-600 font-medium">
                  {selectedDoctor.specialization}
                </p>
                <p className="text-gray-700 font-medium">
                  Fees: {selectedDoctor.fees}
                </p>
              </div>

              {/* User Info Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Blood Group"
                  value={form.bloodGroup}
                  onChange={(e) =>
                    setForm({ ...form, bloodGroup: e.target.value })
                  }
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

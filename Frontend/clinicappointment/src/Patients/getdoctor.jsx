import React, { useState, useEffect } from "react";
import baseurl from "../service/config";
import Navbar from "../components/Navbar";

export default function Getdoctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <span className="font-semibold">9:00 AM - 6:00 PM</span> | Saturday:{" "}
            <span className="font-semibold">10:00 AM - 4:00 PM</span>
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
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-300">
                  <i className="fas fa-calendar-check mr-2"></i>Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

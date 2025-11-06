import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo data for UI (tu baad me API se fetch kr lena)
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        doctor: "Dr. Zeeshan Ahmed",
        specialization: "Cardiologist",
        date: "2025-11-06",
        time: "10:00 AM",
        status: "Upcoming",
        fees: 500,
      },
      {
        id: 2,
        doctor: "Dr. Sana Malik",
        specialization: "Dermatologist",
        date: "2025-10-25",
        time: "4:00 PM",
        status: "Completed",
        fees: 700,
      },
      {
        id: 3,
        doctor: "Dr. Asad Khan",
        specialization: "Orthopedic",
        date: "2025-10-20",
        time: "12:30 PM",
        status: "Cancelled",
        fees: 600,
      },
    ];
    setAppointments(dummyData);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Appointments
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {appointments.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">
                You have no appointments yet.
              </p>
            ) : (
              <div className="grid gap-6">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Left Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src="https://via.placeholder.com/80"
                        alt="Doctor"
                        className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {appt.doctor}
                        </h2>
                        <p className="text-gray-600 text-sm">
                          {appt.specialization}
                        </p>
                        <p className="text-gray-500 text-sm">
                          <i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
                          {new Date(appt.date).toLocaleDateString()} •{" "}
                          {appt.time}
                        </p>
                      </div>
                    </div>

                    {/* Right Info */}
                    <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                          appt.status === "Upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : appt.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {appt.status}
                      </span>
                      <p className="text-gray-700">
                        <strong>Fees:</strong> ${appt.fees}
                      </p>
                      {appt.status === "Upcoming" && (
                        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition-all duration-300">
                          <i className="fas fa-times mr-2"></i>Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

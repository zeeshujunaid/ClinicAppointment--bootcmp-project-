import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/Authcontext";
import Navbar from "../Components/navbar";

export default function PatientProfile() {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments)); 
    }
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col items-center py-12 px-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 text-center mb-8">
          {!user ? (
            <div className="flex flex-col items-center justify-center h-60">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mb-3"></div>
              <p className="text-gray-500 text-sm">Loading user details...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <img
                  src={
                    user.image ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-red-500 object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.fullname}
              </h2>
              <p className="text-gray-500 text-sm mb-2">{user.email}</p>

              <div className="mt-6 text-left space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-800">
                    {user.phone || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium text-gray-800">
                    {user.age || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-800">
                    {user.email || "N/A"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🗓️ Your Appointments
          </h2>

          {loading ? (
            <div className="text-center text-gray-500">
              Loading appointments...
            </div>
          ) : appointments.length === 0 ? (
            <p className="text-center text-gray-500">No appointments found.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appt, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      Doctor: {appt.doctorId?.fullname || "Unknown Doctor"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(appt.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          appt.status === "Completed"
                            ? "text-green-600"
                            : appt.status === "Pending"
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Fees: Rs. {appt.doctorId?.fees || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

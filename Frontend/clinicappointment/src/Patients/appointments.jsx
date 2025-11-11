import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/navbar";
import { UserContext } from "../context/Authcontext";
import baseurl from "../service/config";
import { toast } from "react-toastify";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user || !(user._id || user.id)) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const userId = user._id || user.id;
        const res = await fetch(`${baseurl}/api/appointment/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        localStorage.setItem("appointments", JSON.stringify(data));

        if (res.ok) {
          setAppointments(Array.isArray(data) ? data : data.appointments || []);
        } else {
          setAppointments([]);
        }
        toast.success("appointment succesfull")
      } catch (error) {
        setAppointments([]);
        toast.error("error fetching appointment")
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const formatTime = (start, end) => {
    return `${new Date(start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${new Date(end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-18">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Appointments
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            You have no appointments yet.
          </p>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      appt.doctorId?.image ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt={appt.doctorId?.fullname || "Doctor"}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {appt.doctorId?.fullname || "Unknown Doctor"}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {appt.doctorId?.specialization || "N/A"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      <i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
                      {new Date(appt.date).toLocaleDateString()} •{" "}
                      {formatTime(appt.startTime, appt.endTime)}
                    </p>
                  </div>
                </div>

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
                    <strong>Fees:</strong> Rs. {appt.doctorId?.fees || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";
import { toast } from "react-toastify";

export default function Homescreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseurl}/api/appointment/all`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok){
          throw new Error(toast.error("error fetching"));
        }

        const today = new Date();
        const isToday = (date) => {
          const d = new Date(date);
          return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
          );
        };

        const todaysAppointments = (data.appointments || []).filter((appt) =>
          isToday(appt.date)
        );

        setAppointments(todaysAppointments);
        toast.success("appointment fetched succesfully")
      } catch (err) {
        console.error("Error fetching appointments:", err);
        toast.error("Error fetching appointments:");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100">
        <Sidebar />
      </div>

      <div className="w-4/5 bg-gray-100 p-8 overflow-y-auto flex flex-col">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Staff Dashboard
        </h1>

        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            <i className="fas fa-calendar-check text-blue-500 text-4xl mb-3"></i>
            <h3 className="text-lg font-semibold text-gray-800">
              Today's Appointments
            </h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {appointments.length}
            </p>
          </div>

          <div className="flex-1 bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            <i className="fas fa-user-injured text-green-500 text-4xl mb-3"></i>
            <h3 className="text-lg font-semibold text-gray-800">
              Today's Patients
            </h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {appointments.filter((a) => a.userId).length}
            </p>
          </div>

          <div className="flex-1 bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            <i className="fas fa-user-md text-yellow-500 text-4xl mb-3"></i>
            <h3 className="text-lg font-semibold text-gray-800">
              Today's Doctors
            </h3>
            <p className="text-2xl font-bold text-yellow-600 mt-2">
              {appointments.filter((a) => a.doctorId).length}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col">
          <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
            Today's Appointments
          </h1>

          {loading ? (
            <p className="text-center text-gray-500 text-lg">
              Loading appointments...
            </p>
          ) : appointments.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No appointments found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-green-100 text-gray-800">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Patient Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Room</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, index) => (
                    <tr
                      key={appt._id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-green-50`}
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">
                        {appt.userId?.fullname || "Unknown"}
                      </td>
                      <td className="p-3">
                        {appt.userId?.email || "No email"}
                      </td>
                      <td className="p-3">
                        {appt.roomScheduleId?.roomNumber || "No room"}
                      </td>
                      <td className="p-3">
                        {new Date(appt.date).toLocaleDateString()}
                      </td>
                      <td className="p-3">{appt.time || "-"}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            appt.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appt.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

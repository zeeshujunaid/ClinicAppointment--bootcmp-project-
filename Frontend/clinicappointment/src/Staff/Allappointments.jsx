import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";
import { toast } from "react-toastify";

export default function Allapointment() {
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
        if (!res.ok) {
          throw new Error(toast.error("error fetching"));
        }

        setAppointments(data.appointments || []);
        toast.success("Appointment fetched succesfully")
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
      <div className="w-1/5 bg-gray-100 ">
        <Sidebar />
      </div>

      <div className="w-4/5 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
          All Appointments
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
          <div className="bg-white rounded-2xl shadow-md p-4">
            <table className="w-full border-collapse">
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
                    <td className="p-3">{appt.userId?.email || "No email"}</td>
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
  );
}

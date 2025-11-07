import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Allappointments() {
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
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch appointments");

        setAppointments(data.appointments || data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 📊 Chart Data — Count per Day
  const dailyCounts = appointments.reduce((acc, app) => {
    const date = new Date(app.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-500">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 bg-gray-100 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
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
          <>
            {/* Chart Section */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Appointments per Day
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Appointment Table */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Appointment Details
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="py-3 px-4 text-left rounded-tl-lg">#</th>
                      <th className="py-3 px-4 text-left">Patient</th>
                      <th className="py-3 px-4 text-left">Doctor</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Time</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left rounded-tr-lg">
                        Fees
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a, i) => (
                      <tr
                        key={a._id}
                        className={`border-b hover:bg-gray-50 ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-3 px-4">{i + 1}</td>
                        <td className="py-3 px-4">
                          {a.patient?.fullname || "Unknown"}
                        </td>
                        <td className="py-3 px-4">
                          {a.doctor?.fullname || "Unknown"}
                        </td>
                        <td className="py-3 px-4">
                          {new Date(a.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">{a.time || "-"}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              a.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : a.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">Rs {a.fee || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

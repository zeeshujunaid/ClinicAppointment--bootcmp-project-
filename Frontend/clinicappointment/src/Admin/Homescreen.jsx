import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalStaff: 0,
  });

  const [recentAppointments, setRecentAppointments] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseurl}/api/auth/getUser`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error fetching users");

        // Save all users in localStorage
        localStorage.setItem("allUsers", JSON.stringify(data.users));

        // Count roles
        const totalPatients = data.users.filter(
          (u) => u.role === "patient"
        ).length;
        const totalDoctors = data.users.filter(
          (u) => u.role === "doctor"
        ).length;
        const totalStaff = data.users.filter((u) => u.role === "staff").length;

        setStats({ totalPatients, totalDoctors, totalStaff });
      } catch (err) {
        console.error("Fetch Users Error:", err);
      }
    };

    fetchUsers();
  }, []);


  const pieData = [
    { name: "Patients", value: stats.totalPatients },
    { name: "Doctors", value: stats.totalDoctors },
    { name: "Staff", value: stats.totalStaff },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-yellow-500">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Welcome, Admin!
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center">
            <p className="text-gray-500 font-medium">Total Patients</p>
            <h2 className="text-2xl font-bold">{stats.totalPatients}</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center">
            <p className="text-gray-500 font-medium">Total Doctors</p>
            <h2 className="text-2xl font-bold">{stats.totalDoctors}</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center">
            <p className="text-gray-500 font-medium">Total Staff</p>
            <h2 className="text-2xl font-bold">{stats.totalStaff}</h2>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-md h-96 mb-8">
          <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Appointments Table */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left border">Patient</th>
                <th className="p-2 text-left border">Doctor</th>
                <th className="p-2 text-left border">Date</th>
                <th className="p-2 text-left border">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.length > 0 ? (
                recentAppointments.map((appt) => (
                  <tr key={appt._id} className="border-b">
                    <td className="p-2 border">{appt.patientName}</td>
                    <td className="p-2 border">{appt.doctorName}</td>
                    <td className="p-2 border">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td
                      className={`p-2 border ${
                        appt.status === "Upcoming"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {appt.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 text-center text-gray-500">
                    No recent appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

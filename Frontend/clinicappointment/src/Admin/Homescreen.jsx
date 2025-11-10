import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalStaff: 0,
  });

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

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
    { name: "Patients", value: stats.totalPatients, fill: COLORS[0] },
    { name: "Doctors", value: stats.totalDoctors, fill: COLORS[1] },
    { name: "Staff", value: stats.totalStaff, fill: COLORS[2] },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100">
        <Sidebar />
      </div>

      <div className="w-4/5 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Welcome, Admin!
        </h1>

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

        <div className="bg-white rounded-xl p-6 shadow-md h-96 mb-8 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="30%"
              outerRadius="100%"
              barSize={20}
              data={pieData}
            >
              <RadialBar
                background
                dataKey="value"
                cornerRadius={10}
                label={{ fill: "#111", position: "insideStart" }}
              />
              <Legend
                iconSize={12}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

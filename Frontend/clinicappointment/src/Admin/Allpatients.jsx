import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import baseurl from "../service/config";

export default function AdminAllpatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseurl}/api/auth/patients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setPatients(data);
        } else if (data.patients) {
          setPatients(data.patients);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);


  const genderData = [
    { name: "Male", value: patients.filter((p) => p.gender === "male").length },
    {
      name: "Female",
      value: patients.filter((p) => p.gender === "female").length,
    },
    {
      name: "Other",
      value: patients.filter(
        (p) => p.gender !== "male" && p.gender !== "female"
      ).length,
    },
  ];

  const COLORS = ["#3B82F6", "#F472B6", "#FBBF24"];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-600">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 bg-gray-100 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">All Patients</h1>

        {/* Summary Cards */}
        {!loading && (
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              <h2 className="text-gray-500 text-sm">Total Patients</h2>
              <p className="text-2xl font-bold text-blue-600">
                {patients.length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              <h2 className="text-gray-500 text-sm">Male</h2>
              <p className="text-2xl font-bold text-blue-600">
                {genderData[0].value}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5 text-center">
              <h2 className="text-gray-500 text-sm">Female</h2>
              <p className="text-2xl font-bold text-pink-500">
                {genderData[1].value}
              </p>
            </div>
          </div>
        )}

        {/* Chart Section */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Gender Distribution
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {genderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Patients Table */}
        {loading ? (
          <p>Loading patients...</p>
        ) : patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <table className="w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Gender</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{patient.fullname}</td>
                  <td className="p-3">{patient.email}</td>
                  <td className="p-3">{patient.phone || "N/A"}</td>
                  <td className="p-3">{patient.age || "-"}</td>
                  <td className="p-3 capitalize">{patient.gender || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

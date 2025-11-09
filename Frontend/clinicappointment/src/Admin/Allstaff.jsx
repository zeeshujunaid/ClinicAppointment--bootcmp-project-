import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Allstaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseurl}/api/auth/staff`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data.message || "Error fetching staff");

        setStaff(data.users || data);
      } catch (err) {
        console.error("Fetch Staff Error:", err);
        setStaff([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // 📊 Chart 1: Staff by Department
  const departmentData = staff.reduce((acc, stf) => {
    const dept = stf.department || "General";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const deptChartData = Object.entries(departmentData).map(([name, count]) => ({
    name,
    count,
  }));

  // 📊 Chart 2: Gender Distribution
  const genderData = staff.reduce((acc, stf) => {
    const g = stf.gender?.toLowerCase() || "unknown";
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  const genderChartData = Object.entries(genderData).map(([name, count]) => ({
    name,
    count,
  }));

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">
          All Staff Members
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading staff...</p>
        ) : staff.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No staff found</p>
        ) : (
          <>
            {/* Charts */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Bar Chart: Department */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Staff by Department
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={deptChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill="#10B981"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart: Gender */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Gender Distribution
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={genderChartData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {genderChartData.map((_, index) => (
                        <Cell
                          key={index}
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

            {/* Staff Cards */}
            <div className="flex flex-wrap justify-center gap-8">
              {staff.map((stf) => (
                <div
                  key={stf._id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-72 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={stf.image || "https://via.placeholder.com/150"}
                    alt={stf.fullname}
                    className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-green-400 shadow-md"
                  />
                  <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                    {stf.fullname}
                  </h2>
                  <span className="text-green-700 text-sm mb-3 px-3 py-1 bg-green-100 rounded-full shadow-sm">
                    {stf.department || "General"}
                  </span>
                  <div className="w-full text-gray-700 text-sm space-y-2 mb-5">
                    <p className="flex items-center gap-2">
                      <i className="fas fa-phone text-green-600"></i>
                      {stf.phone || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fas fa-envelope text-green-600"></i>
                      {stf.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fas fa-user text-green-600"></i>
                      Gender: {stf.gander || "-"}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fas fa-calendar text-green-600"></i>
                      Joined:{" "}
                      {stf.createdAt
                        ? new Date(stf.createdAt).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

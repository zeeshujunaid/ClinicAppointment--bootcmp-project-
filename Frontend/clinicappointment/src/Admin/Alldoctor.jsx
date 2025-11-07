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

export default function AllDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseurl}/api/auth/doctor`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching doctors");

        setDoctors(data.users || data); // API response may vary
      } catch (err) {
        console.error("Fetch Doctors Error:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // 📊 Chart Data — specialization wise count
  const specializationData = doctors.reduce((acc, doc) => {
    const spec = doc.specialization || "Unknown";
    acc[spec] = (acc[spec] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(specializationData).map(([name, count]) => ({
    name,
    count,
  }));

  // 🎨 Pie Chart Color Palette
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-yellow-500">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          All Doctors
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            Loading doctors...
          </p>
        ) : doctors.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No doctors found</p>
        ) : (
          <>
            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Bar Chart */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Doctors by Specialization
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill="#3B82F6"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Specialization Distribution
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((_, index) => (
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

            {/* Doctor Cards */}
            <div className="flex flex-wrap justify-center gap-8">
              {doctors.map((doc) => (
                <div
                  key={doc._id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-72 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={doc.profileImage || "https://via.placeholder.com/150"}
                    alt={doc.fullname}
                    className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-400 shadow-md"
                  />
                  <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                    {doc.fullname}
                  </h2>
                  <span className="text-blue-700 text-sm mb-3 px-3 py-1 bg-blue-100 rounded-full shadow-sm">
                    {doc.specialization}
                  </span>
                  <div className="w-full text-gray-700 text-sm space-y-2 mb-5">
                    <p className="flex items-center gap-2">
                      <i className="fas fa-briefcase text-blue-600"></i>
                      <strong>Experience:</strong> {doc.experience || 0} yrs
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fas fa-dollar-sign text-blue-600"></i>
                      <strong>Fees:</strong> ${doc.fees || 0}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fas fa-phone text-blue-600"></i>
                      {doc.phone || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fas fa-calendar text-blue-600"></i>
                      Joined:{" "}
                      {doc.createdAt
                        ? new Date(doc.createdAt).toLocaleDateString()
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

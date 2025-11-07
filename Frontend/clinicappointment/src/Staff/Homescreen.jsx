import React from "react";
import Sidebar from "../Components/sidebar";

export default function Homescreen() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-600">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 bg-gray-100 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Staff Dashboard
        </h1>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            <i className="fas fa-calendar-check text-blue-500 text-4xl mb-3"></i>
            <h3 className="text-lg font-semibold text-gray-800">
              Total Appointments
            </h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">45</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            <i className="fas fa-user-injured text-green-500 text-4xl mb-3"></i>
            <h3 className="text-lg font-semibold text-gray-800">
              Total Patients
            </h3>
            <p className="text-2xl font-bold text-green-600 mt-2">120</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            <i className="fas fa-user-md text-yellow-500 text-4xl mb-3"></i>
            <h3 className="text-lg font-semibold text-gray-800">
              Total Doctors
            </h3>
            <p className="text-2xl font-bold text-yellow-600 mt-2">12</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome back, Staff Member 👋
          </h2>
          <p className="text-gray-600 leading-relaxed">
            From this dashboard, you can easily manage appointments, view
            patient records, and coordinate with doctors. Use the sidebar to
            navigate through different sections.
          </p>
        </div>
      </div>
    </div>
  );
}

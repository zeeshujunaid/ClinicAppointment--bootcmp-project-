import React, { useContext } from "react";
import { UserContext } from "../context/Authcontext";
import Navbar from "../Components/navbar";

export default function PatientProfile() {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Page Container */}
      <div className="flex justify-center items-center py-12 px-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 text-center">
          {!user ? (
            // 🔄 Loading Card
            <div className="flex flex-col items-center justify-center h-60">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mb-3"></div>
              <p className="text-gray-500 text-sm">Loading user details...</p>
            </div>
          ) : (
            <>
              {/* Profile Picture */}
              <div className="flex justify-center mb-4">
                <img
                  src={
                    user.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-red-500 object-cover"
                />
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.fullname || "Patient Name"}
              </h2>
              <p className="text-gray-500 text-sm mb-2">{user.email}</p>

              <div className="mt-6 text-left space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-800">
                    {user.phone || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium text-gray-800">
                    {user.age || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium text-gray-800">
                    {user.gender || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-gray-800 text-right">
                    {user.address || "N/A"}
                  </span>
                </div>
              </div>

              {/* Token Display */}
              {user.token && (
                <div className="mt-6 bg-gray-50 p-3 rounded-lg text-xs text-gray-500 break-words">
                  <span className="font-semibold">Token:</span> {user.token}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

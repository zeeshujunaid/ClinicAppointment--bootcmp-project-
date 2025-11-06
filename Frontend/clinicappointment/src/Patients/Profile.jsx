import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import baseurl from "../service/config";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${baseurl}/api/auth/getUser`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log(data)
        setUser(data);
      } catch (error) {
        console.log("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <Navbar />

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <h2 className="text-gray-700 text-lg font-medium">
              Loading Profile...
            </h2>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-12 mt-10">
          {/* Card Container */}
          <div className="bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-white/30 hover:shadow-blue-200 transition-all duration-300">
            {/* Profile Header */}
            <div className="flex flex-col items-center">
              <img
                src={user?.profileImgurl || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-lg mb-4"
              />
              <h2 className="text-3xl font-bold text-gray-800">
                {/* {user?.fullname} */}
                zeeshan junaid
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            {/* Divider Line */}
            <div className="my-8 border-t border-gray-300"></div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
              <div className="p-4 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition">
                <i className="fas fa-phone text-blue-600 mr-2"></i>
                <strong>Phone:</strong> 
                0300035893903
                {/* {user?.phone || "N/A"} */}
              </div>

              <div className="p-4 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition">
                <i className="fas fa-envelope text-blue-600 mr-2"></i>
                <strong>Email:</strong> 
                junaidzeeshan@gmail.com
                {/* {user?.email} */}
              </div>

              {user?.experience && (
                <div className="p-4 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition">
                  <i className="fas fa-briefcase text-blue-600 mr-2"></i>
                  <strong>Experience:</strong> 
                  {user.experience}  yrs
                </div>
              )}

              {user?.specialization && (
                <div className="p-4 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition">
                  <i className="fas fa-user-md text-blue-600 mr-2"></i>
                  <strong>Specialization:</strong> 
                  {user.specialization}
                </div>
              )}

              <div className="p-4 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition sm:col-span-2">
                <i className="fas fa-calendar text-blue-600 mr-2"></i>
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300">
                <i className="fas fa-edit mr-2"></i>Edit Profile
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

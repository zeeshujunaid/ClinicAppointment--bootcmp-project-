import React, { useContext } from "react";
import { UserContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;

// role=admin 
  if (user.role === "admin") {
    return (
      <div className="flex flex-col h-screen w-64 bg-blue-600 text-white p-6">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-10">
          <img
            src={
              user.image ||
              "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            }
            alt={user.fullname}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <h2 className="font-semibold text-lg">{user.fullname}</h2>
            <p className="text-sm text-blue-200 capitalize">{user.role}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/Adminhomescreen")}
            className="hover:bg-blue-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-users"></i> <span>Home Screen</span>
          </button>
          <button
            onClick={() => navigate("/AdminAllpatients")}
            className="hover:bg-blue-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-users"></i> <span>All Patients</span>
          </button>
          <button
            onClick={() => navigate("/Adminalldoctors")}
            className="hover:bg-blue-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-user-md"></i> <span>All Doctors</span>
          </button>
          <button
            onClick={() => navigate("/Adminaddstaff")}
            className="hover:bg-purple-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-hospital"></i> <span>AddStaff</span>
          </button>
          <button
            onClick={() => navigate("/AdminAllstaff")}
            className="hover:bg-blue-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-users-cog"></i> <span>All Staff</span>
          </button>
          <button
            onClick={() => navigate("/Adminallapointment")}
            className="hover:bg-blue-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-calendar-check"></i>{" "}
            <span>All Appointments</span>
          </button>
        </div>

        <div className="mt-auto">
          <button
            className="flex items-center space-x-3 hover:bg-blue-500 p-2 rounded-lg transition-all w-full"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }
// role=doctor
  else if (user.role === "doctor") {
    return (
      <div className="flex flex-col h-screen w-64 bg-green-600 text-white p-6">
        <div className="flex items-center space-x-3 mb-10">
          <img
            src={
              user.image ||
              "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            }
            alt={user.fullname}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <h2 className="font-semibold text-lg">{user.fullname}</h2>
            <p className="text-sm text-green-200 capitalize">{user.role}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/Doctornextappointment")}
            className="hover:bg-green-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-calendar-check"></i>{" "}
            <span>Next Appointment</span>
          </button>
          <button
            onClick={() => navigate("/Doctorallapointment")}
            className="hover:bg-green-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-calendar-alt"></i>{" "}
            <span>All Appointments</span>
          </button>
          <button
            onClick={() => navigate("/Doctorallstaff")}
            className="hover:bg-green-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-users"></i> <span>All Staff</span>
          </button>
        </div>

        <div className="mt-auto">
          <button
            className="flex items-center space-x-3 hover:bg-green-500 p-2 rounded-lg transition-all w-full"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }
// role = staff
  else if (user.role === "staff") {
    return (
      <div className="flex flex-col h-screen w-64 bg-purple-600 text-white p-6">
        <div className="flex items-center space-x-3 mb-10">
          <img
            src={
              user.image ||
              "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            }
            alt={user.fullname}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <h2 className="font-semibold text-lg">{user.fullname}</h2>
            <p className="text-sm text-purple-200 capitalize">{user.role}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/StaffHomescreen")}
            className="hover:bg-purple-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-hospital"></i> <span>Homescreen</span>
          </button>
          <button
            onClick={() => navigate("/Staffallapointments")}
            className="hover:bg-purple-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-calendar-alt"></i>{" "}
            <span>All Appointments</span>
          </button>
          <button
            onClick={() => navigate("/Staffcreateroom")}
            className="hover:bg-purple-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-hospital"></i> <span>Manage Room</span>
          </button>
          <button
            onClick={() => navigate("/DoctorRoomschedule")}
            className="hover:bg-purple-500 p-2 rounded-lg flex items-center space-x-2"
          >
            <i className="fas fa-hospital"></i> <span>Room Schedule</span>
          </button>
        </div>

        <div className="mt-auto">
          <button
            className="flex items-center space-x-3 hover:bg-purple-500 p-2 rounded-lg transition-all w-full"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }
  return <div>No Sidebar Available</div>;
}

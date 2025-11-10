import { useEffect, useState, useContext } from "react";
import Sidebar from "../Components/sidebar"; 
import baseurl from "../service/config";
import { UserContext } from "../context/Authcontext";

export default function Allappointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = user._id || user.id;
        if (!userId) {
          console.error("User not found in localStorage");
          setLoading(false);
          return;
        }

        const res = await fetch(`${baseurl}/api/appointment/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setAppointments(data);
        } else if (data.appointments) {
          setAppointments(data.appointments);
        }
      } catch (error) {
        console.error("Error fetching doctor appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);


  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          My Appointments
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-20 text-lg font-semibold">
            Loading appointments...
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700">#</th>
                  <th className="py-3 px-4 text-left text-gray-700">Patient</th>
                  <th className="py-3 px-4 text-left text-gray-700">Email</th>
                  <th className="py-3 px-4 text-left text-gray-700">Date</th>
                  <th className="py-3 px-4 text-left text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt, index) => (
                  <tr key={apt._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      {apt.userId?.fullname || "Unknown"}
                    </td>
                    <td className="py-3 px-4">{apt.userId?.email || "N/A"}</td>
                    <td className="py-3 px-4">
                      {apt.date
                        ? new Date(apt.date).toLocaleString()
                        : "Not set"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          apt.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : apt.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {apt.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

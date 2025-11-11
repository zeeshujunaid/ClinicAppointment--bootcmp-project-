import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";
import { toast } from "react-toastify";

export default function AllRoomSchedule() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseurl}/api/room/roomschedule`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch rooms");

      setRooms(data.rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Error fetching rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100">
        <Sidebar />
      </div>

      <div className="w-4/5 p-6 overflow-y-auto bg-gray-50">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          All Room Schedules
        </h1>

        {loading ? (
          <p>Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p>No room schedules found.</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Room Number</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Start Time</th>
                <th className="p-3 text-left">End Time</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr
                  key={room._id}
                  className={`border-b hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    {room.doctorId?.fullname || "Unknown"}
                  </td>
                  <td className="p-3">{room.roomNumber}</td>
                  <td className="p-3">
                    {new Date(room.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(room.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3">
                    {new Date(room.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      room.status === "available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {room.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

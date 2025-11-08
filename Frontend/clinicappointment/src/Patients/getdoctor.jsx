import React, { useState, useEffect ,useContext} from "react";
import baseurl from "../service/config";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/Authcontext";

export default function Getdoctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    age: "",
    bloodGroup: "",
    address: "",
    phone: "",
    emergencyContact: "",
    date: "",
  });

  // 🧩 Fetch All Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseurl}/api/auth/doctor`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.log("Fetch failed =>", data.message);
          setDoctors([]);
          return;
        }

        setDoctors(data);
      } catch (error) {
        console.log("Error fetching doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // 🧩 Fetch Available Slots by Doctor + Date
  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      setLoadingSlots(true);

      const res = await fetch(`${baseurl}/api/room/date/${date}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error fetching slots");
        setSlots([]);
        return;
      }

      // Filter by selected doctor
      const filteredSlots = data.slots.filter(
        (slot) => slot.doctorId._id === doctorId
      );

      setSlots(filteredSlots || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load slots");
    } finally {
      setLoadingSlots(false);
    }
  };

  // 🧩 Book Selected Slot
  const handleBookSlot = async (slot) => {
    const userId = user._id || user.id;
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first");

      const res = await fetch(`${baseurl}/api/appointment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId: userId,
          doctorId: selectedDoctor._id,
          fees:selectedDoctor.fees,
          roomScheduleId: slot._id,
          reason: "General Checkup",
          age: form.age,
          bloodGroup: form.bloodGroup,
          address: form.address,
          phone: form.phone,
          emergencyContact: form.emergencyContact,
          date: slot.date, 
          startTime: slot.startTime, 
          endTime: slot.endTime, 
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        alert(data.message || "Error booking appointment");
        return;
      }

      alert("Appointment booked successfully!");
      setSlots(slots.filter((s) => s._id !== slot._id));
      setForm({
        age: "",
        bloodGroup: "",
        address: "",
        phone: "",
        emergencyContact: "",
        date: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // 🧩 Handle Modal Open/Close
  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
    setSlots([]);
    setForm({
      age: "",
      bloodGroup: "",
      address: "",
      phone: "",
      emergencyContact: "",
      date: "",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
    setForm({
      age: "",
      bloodGroup: "",
      address: "",
      phone: "",
      emergencyContact: "",
      date: "",
    });
    setSlots([]);
  };

  // 🧩 Format time
  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Clinic Timing Info */}
      <div className="mt-16 bg-gradient-to-r from-blue-100 to-blue-200 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 sm:mb-0 flex items-center gap-2">
            <i className="fas fa-clock text-blue-700"></i>
            Clinic Opening Hours
          </h2>
          <p className="text-gray-800 text-base sm:text-lg text-center sm:text-left font-medium">
            Monday - Friday:{" "}
            <span className="font-semibold">9:00 AM - 6:00 PM</span> |
            Saturday/Sunday: Closed
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Doctors
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            Loading doctors...
          </p>
        ) : !doctors.length ? (
          <p className="text-center text-gray-500 text-lg">No doctors found</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-72 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={doc.profileImgurl || "https://via.placeholder.com/150"}
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
                    <strong>Experience:</strong> {doc.experience} yrs
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-dollar-sign text-blue-600"></i>
                    <strong>Fees:</strong> ${doc.fees}
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-phone text-blue-600"></i>
                    {doc.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-calendar text-blue-600"></i>
                    Joined: {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleBookClick(doc)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-300"
                >
                  <i className="fas fa-calendar-check mr-2"></i>Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedDoctor && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 sm:p-8 w-11/12 sm:w-96 shadow-xl relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                onClick={closeModal}
              >
                ✖
              </button>

              <div className="mb-5 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedDoctor.fullname}
                </h2>
                <p className="text-blue-600 font-medium">
                  {selectedDoctor.specialization}
                </p>
                <p className="text-gray-700 font-medium">
                  Fees: {selectedDoctor.fees}
                </p>
              </div>

              {/* Patient Info Form */}
              <div className="space-y-3 mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Age:
                </label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label className="block text-sm font-medium text-gray-700">
                  Blood Group:
                </label>
                <input
                  type="text"
                  value={form.bloodGroup}
                  onChange={(e) =>
                    setForm({ ...form, bloodGroup: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label className="block text-sm font-medium text-gray-700">
                  Address:
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label className="block text-sm font-medium text-gray-700">
                  Phone:
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact:
                </label>
                <input
                  type="text"
                  value={form.emergencyContact}
                  onChange={(e) =>
                    setForm({ ...form, emergencyContact: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label className="block text-sm font-medium text-gray-700">
                  Select Date:
                </label>
                <input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setForm({ ...form, date: e.target.value });
                    fetchAvailableSlots(selectedDoctor._id, e.target.value);
                  }}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Available Slots */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Available Slots
                </h3>
                {loadingSlots ? (
                  <p className="text-gray-500">Loading slots...</p>
                ) : slots.length === 0 ? (
                  <p className="text-gray-500">No slots available</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {slots.map((slot) => (
                      <div
                        key={slot._id}
                        className="border p-3 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Room {slot.roomNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatTime(slot.startTime)} -{" "}
                            {formatTime(slot.endTime)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleBookSlot(slot)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Book
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

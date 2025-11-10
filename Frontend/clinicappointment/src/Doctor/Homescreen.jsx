import { useEffect, useState, useContext } from "react";
import Sidebar from "../Components/sidebar";
import baseurl from "../service/config";
import { UserContext } from "../context/Authcontext";

export default function Homescreen() {
  const { user } = useContext(UserContext); 
  const [newMedication, setNewMedication] = useState("");
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      const userId = user._id || user.id;
      const today = new Date().toISOString().split("T")[0];

      try {
        const res = await fetch(
          `${baseurl}/api/appointment/getdoctortodayappointment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              doctorId: userId,
              date: today,
            }),
          }
        );

        const data = await res.json();

        if (data.doctorAppointments && data.doctorAppointments.length > 0) {
          const uniquePatients = [];
          const map = new Map();

          data.doctorAppointments.forEach((apt) => {
            const patientId = apt.userId._id;

            if (!map.has(patientId)) {
              map.set(patientId, true);

              uniquePatients.push({
                _id: patientId,
                name: apt.userId.fullname,
                email: apt.userId.email,
                phone: apt.userId?.phone || "N/A",
                age: apt.userId?.age,
                bloodGroup: apt.bloodGroup,
                address: apt.address,
                emergencyContact: apt.emergencyContact,
                medicalHistory: apt.medicalHistory,
                currentMedications: apt.currentMedications
                  ? [apt.currentMedications]
                  : [],
                appointmentId: apt._id,
                status:apt.status,
              });
            }
          });

          setPatients(uniquePatients);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

   fetchAppointments();
  }, [user]);

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setShowModal(false);
  };


  const handleSaveMedication = async () => {
    if (!newMedication.trim()) return alert("Please enter medication");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${baseurl}/api/appointment/appointment/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentId: selectedPatient.appointmentId,
            newMedication: newMedication.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Error completing appointment");
      }

      setPatients((prev) =>
        prev.map((p) =>
          p._id === selectedPatient._id
            ? {
                ...p,
                currentMedications: [
                  ...p.currentMedications,
                  newMedication.trim(),
                ],
              }
            : p
        )
      );

      alert("Appointment completed and medication added!");
      setNewMedication("");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };


  return (
    <div className="flex h-screen">
      <div className="flex-none w-[20%] bg-gray-100">
        <Sidebar />
      </div>

      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Welcome, Doctor!</h1>
          <p className="text-gray-700 mt-2">
            Here are your patients. Click "Check Patient" to view details.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="flex flex-col justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition w-full sm:w-[48%]"
            >
              <div>
                <h2 className="text-lg font-semibold">{patient.name}</h2>
                <p className="text-gray-500">{patient.email}</p>
                <p className="text-gray-500">{patient.phone}</p>
              </div>

              <div className="flex gap-2 mt-4">
                {patient.status === "Completed" ? (
                  <button
                    className="flex-1 bg-green-400 text-white px-3 py-2 rounded cursor-not-allowed"
                    disabled
                  >
                    Completed
                  </button>
                ) : (
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                    onClick={() => openModal(patient)}
                  >
                    Check Patient
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedPatient && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30">
          <div className="flex flex-col bg-white rounded-xl p-6 w-11/12 sm:w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              className="self-end text-gray-400 hover:text-gray-600 mb-2"
              onClick={closeModal}
            >
              ✖
            </button>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{selectedPatient.name}</h2>
              <p className="text-gray-600">Email: {selectedPatient.email}</p>
              <p className="text-gray-600">Phone: {selectedPatient.phone}</p>
              <p className="text-gray-600">Age: {selectedPatient.age}</p>
              <p className="text-gray-600">
                Blood Group: {selectedPatient.bloodGroup}
              </p>
              <p className="text-gray-600">
                Address: {selectedPatient.address}
              </p>
              <p className="text-gray-600">
                Emergency Contact: {selectedPatient.emergencyContact}
              </p>
              <p className="text-gray-600">
                Medical History: {selectedPatient.medicalHistory || "N/A"}
              </p>

              <div className="mt-4">
                <h3 className="font-semibold mb-1">Current Medications:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedPatient.currentMedications.map((med, index) => (
                    <li key={index}>{med}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-col">
                <h3 className="font-semibold mb-1">Add Medication:</h3>
                <input
                  type="text"
                  placeholder="Enter medication description"
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                onClick={handleSaveMedication}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

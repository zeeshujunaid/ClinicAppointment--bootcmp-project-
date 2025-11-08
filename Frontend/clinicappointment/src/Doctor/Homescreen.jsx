import { useState } from "react";
import Sidebar from "../Components/sidebar";

export default function Homescreen() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Static patient data
  const patients = [
    {
      id: 1,
      name: "Ahsan",
      email: "ahsan@gmail.com",
      phone: "09876543",
      previousMedications: ["Paracetamol", "Vitamin D"],
    },
    {
      id: 2,
      name: "Sara",
      email: "sara@gmail.com",
      phone: "012345678",
      previousMedications: ["Ibuprofen"],
    },
  ];

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setShowModal(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex-none w-[20%] bg-gray-100">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Welcome, Doctor!</h1>
          <p className="text-gray-700 mt-2">
            Here are your patients. Click "Check Patient" to view details.
          </p>
        </div>

        {/* Patient Cards */}
        <div className="flex flex-wrap gap-6">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex flex-col justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition w-full sm:w-[48%]"
            >
              <div>
                <h2 className="text-lg font-semibold">{patient.name}</h2>
                <p className="text-gray-500">{patient.email}</p>
                <p className="text-gray-500">{patient.phone}</p>
              </div>

              {/* Buttons Row */}
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                  onClick={() => openModal(patient)}
                >
                  Check Patient
                </button>
                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                  onClick={() => alert("Complete Appointment clicked")}
                >
                  Complete
                </button>
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                  onClick={() => alert("Cancel Appointment clicked")}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Modal */}
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

              <div className="mt-4">
                <h3 className="font-semibold mb-1">Previous Medications:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedPatient.previousMedications.map((med, index) => (
                    <li key={index}>{med}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-col">
                <h3 className="font-semibold mb-1">Add Medication:</h3>
                <input
                  type="text"
                  placeholder="Enter medication description"
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                onClick={closeModal}
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

import React from "react";

export default function Doctorlist() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      specialty: "Cardiologist",
      experience: "10 Years",
      rating: "4.9",
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    },
    {
      id: 2,
      name: "Dr. Ali Khan",
      specialty: "Dermatologist",
      experience: "8 Years",
      rating: "4.7",
      img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    },
    {
      id: 3,
      name: "Dr. Ayesha Malik",
      specialty: "Pediatrician",
      experience: "6 Years",
      rating: "4.8",
      img: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-100 py-16 px-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-10">
        Meet Our Top Doctors
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-blue-100 transition-all duration-300 hover:-translate-y-1 w-72"
          >
            <img
              src={doc.img}
              alt={doc.name}
              className="w-24 h-24 rounded-full border-4 border-blue-200 mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-blue-700">{doc.name}</h3>
            <p className="text-gray-600 text-sm">{doc.specialty}</p>
            <p className="text-gray-500 text-xs mb-1">
              Experience: {doc.experience}
            </p>
            <span className="text-yellow-500 text-sm font-semibold">
              ⭐ {doc.rating}
            </span>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg transition-all duration-300">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

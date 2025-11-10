import React from "react";
import Navbar from "../Components/navbar";
import Recentarticle from "../Components/recentarticles";
import FrequentlyQuestion from "../Components/frequentlyquestion";
import Doctorlist from "../Components/doctorlist";

export default function Homescreen() {
  return (
    <>
      <Navbar />

      <section className="flex flex-col md:flex-row items-center justify-center px-10 md:px-16 py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-100">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700">
            Welcome to <span className="text-blue-600">ClinicCare</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-md">
            Book appointments, consult top doctors, and manage your health
            online — anytime, anywhere.
          </p>
          <a
            href="/doctors"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Book Appointment
          </a>
        </div>

        <div className="flex justify-center mt-10 md:mt-0">
          <img src="/doctor2.png" alt="Doctor" className="w-72 md:w-96" />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center bg-white py-16 px-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">
          Why Choose ClinicCare?
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center w-full md:w-1/3 hover:shadow-lg transition-all">
            <img
              src="/doctorteam.png"
              alt="Expert Doctors"
              className="w-30 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Expert Doctors
            </h3>
            <p className="text-gray-600 text-sm">
              Consult with highly qualified and experienced doctors for all your
              medical needs.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center w-full md:w-1/3 hover:shadow-lg transition-all">
            <img
              src="/appointmentbooking.png"
              alt="Easy Appointments"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Easy Appointments
            </h3>
            <p className="text-gray-600 text-sm">
              Book appointments easily with just a few clicks — no long waiting
              lines!
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center w-full md:w-1/3 hover:shadow-lg transition-all">
            <img
              src="/service.png"
              alt="24/7 Support"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600 text-sm">
              Our support team is always available to help you whenever you need
              assistance.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center bg-gray-50 py-16 px-10">
        <Recentarticle />
      </section>

      <section className="flex flex-col items-center justify-center bg-white py-16 px-10">
        <FrequentlyQuestion />
      </section>

      <section className="flex flex-col items-center justify-center bg-gray-50 py-16 px-10">
        <Doctorlist />
      </section>

      <footer className="bg-blue-700 text-white text-center py-6 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} ClinicCare — All Rights Reserved
        </p>
      </footer>
    </>
  );
}
